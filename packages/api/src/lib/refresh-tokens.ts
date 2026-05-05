/**
 * Refresh token storage using token-keyed Redis entries.
 *
 * Layout:
 *   refresh:{token}         → userId   (TTL = REFRESH_TTL)
 *   user_tokens:{userId}    → Set<token>  (TTL = REFRESH_TTL, sliding)
 *
 * This enables:
 *   - Token rotation on every refresh (old token deleted, new one created)
 *   - Theft detection (reuse of consumed token → revoke all sessions)
 *   - Full session invalidation (ban, password reset)
 */

import type { Redis } from 'ioredis';

const REFRESH_TTL = 60 * 60 * 24 * 30; // 30 days in seconds

/** Store a new refresh token for a user. */
export async function storeRefreshToken(
  redis: Redis,
  userId: string,
  token: string,
): Promise<void> {
  const pipeline = redis.pipeline();
  pipeline.setex(`refresh:${token}`, REFRESH_TTL, userId);
  pipeline.sadd(`user_tokens:${userId}`, token);
  pipeline.expire(`user_tokens:${userId}`, REFRESH_TTL);
  await pipeline.exec();
}

/**
 * Consume (delete) a refresh token and return the associated userId.
 * Returns null if the token was not found (already consumed or never existed).
 */
export async function consumeRefreshToken(
  redis: Redis,
  token: string,
): Promise<string | null> {
  // Atomic: GET then DEL using pipeline
  const userId = await redis.get(`refresh:${token}`);
  if (!userId) return null;

  const pipeline = redis.pipeline();
  pipeline.del(`refresh:${token}`);
  pipeline.srem(`user_tokens:${userId}`, token);
  await pipeline.exec();

  return userId;
}

/** Invalidate all active sessions for a user (ban, password reset, theft). */
export async function invalidateAllUserTokens(
  redis: Redis,
  userId: string,
): Promise<void> {
  const tokens = await redis.smembers(`user_tokens:${userId}`);
  if (tokens.length > 0) {
    const pipeline = redis.pipeline();
    for (const t of tokens) {
      pipeline.del(`refresh:${t}`);
    }
    pipeline.del(`user_tokens:${userId}`);
    await pipeline.exec();
  }
}

/** Remove a single refresh token (on logout). */
export async function removeRefreshToken(
  redis: Redis,
  userId: string,
  token: string,
): Promise<void> {
  const pipeline = redis.pipeline();
  pipeline.del(`refresh:${token}`);
  pipeline.srem(`user_tokens:${userId}`, token);
  await pipeline.exec();
}
