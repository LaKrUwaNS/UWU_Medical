// utils/generateTokens.ts
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from './dotenv';

interface TokenPayload {
    id: string;
    iat: number;
    exp?: number;
}

export const generateAccessToken = (userId: string): string => {
    return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET as string);
};


interface TokenPayload {
    id: string;
    iat: number;
    exp?: number;
}

/**
 * Verifies and decodes JWT token and returns the user ID
 * @param token JWT access token (usually from cookies or Authorization header)
 * @returns User ID if valid, or null if invalid
 */
export const decodeAccessToken = (token: string): string | null => {
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET as string) as TokenPayload;
        return decoded.id;
    } catch (error) {
        return null; // Invalid or expired token
    }
};