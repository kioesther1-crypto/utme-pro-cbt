import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export const hashPassword = async (value: string) => bcrypt.hash(value, 12);
export const verifyPassword = async (value: string, hash: string) => bcrypt.compare(value, hash);

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "utme-pro-cbt-dev-secret");

export async function issueToken(payload: Record<string, any>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
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

export { prisma };
