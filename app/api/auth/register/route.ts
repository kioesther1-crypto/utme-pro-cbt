import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const ACCESS_TOKEN_TTL = "15m";
export const REFRESH_TOKEN_TTL = "30d";

const refreshTokenStore = new Map<string, { userId: string; expiresAt: number }>();

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export const hashPassword = async (value: string) => bcrypt.hash(value, 12);
export const verifyPassword = async (value: string, hash: string) => bcrypt.compare(value, hash);

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "utme-pro-cbt-dev-secret");

export async function issueToken(payload: Record<string, any>, expiresIn: string = ACCESS_TOKEN_TTL) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function issueRefreshToken(userId: string) {
  const token = await issueToken({ sub: userId, type: "refresh" }, REFRESH_TOKEN_TTL);
  refreshTokenStore.set(token, { userId, expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30 });
  return token;
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export async function verifyRefreshToken(token: string) {
  const payload = await verifyToken(token);
  if (payload.type !== "refresh") throw new Error("Invalid token type");

  const stored = refreshTokenStore.get(token);
  if (!stored || stored.expiresAt < Date.now()) {
    refreshTokenStore.delete(token);
    throw new Error("Refresh token expired");
  }

  return payload;
}

export function sanitizeUser(user: any) {
  if (!user) return null;
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone ?? null,
    role: user.role,
    emailVerified: user.emailVerified ?? false,
    createdAt: user.createdAt?.toISOString?.() ?? user.createdAt,
  };
}

export function setAuthCookies(response: NextResponse, accessToken: string, refreshToken: string) {
  response.cookies.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });

  response.cookies.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set("access_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("refresh_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}

export async function getRequestUser(req: NextRequest) {
  const authorization = req.headers.get("authorization") ?? "";
  const bearerToken = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  const cookieToken = req.cookies.get("access_token")?.value || "";

  const token = bearerToken || cookieToken;
  if (!token) return null;

  try {
    const payload = await verifyToken(token);
    return await getUserById(String(payload.sub));
  } catch (error) {
    return null;
  }
}

export { prisma, refreshTokenStore };
