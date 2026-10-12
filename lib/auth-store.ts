import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

export type UserRecord = {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  phone?: string;
  role: "student" | "admin";
  createdAt: string;
};

export const users: UserRecord[] = [];

export const getUserByEmail = (email: string) =>
  users.find((user) => user.email.toLowerCase() === email.toLowerCase());

export const getUserById = (id: string) => users.find((user) => user.id === id);

export const hashPassword = (value: string) => bcrypt.hash(value, 12);
export const verifyPassword = (value: string, hash: string) => bcrypt.compare(value, hash);

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "utme-pro-cbt-dev-secret");

export async function issueToken(payload: Record<string, string>) {
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

export function sanitizeUser(user: UserRecord) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone ?? null,
    role: user.role,
    createdAt: user.createdAt,
  };
}
