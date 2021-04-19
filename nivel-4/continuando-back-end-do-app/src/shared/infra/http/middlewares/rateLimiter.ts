import { Request, Response, NextFunction, request } from "express";
import redis from "redis";
import AppError from "@shared/errors/AppError";
import { RateLimiterRedis } from "rate-limiter-flexible";

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
  enable_offline_queue: false,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "ratelimit",
  points: 5, // 5 requests
  duration: 1, // per 1 second by IP
});

export default async function rateLimiter(
  reques: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError("Too many requests", 429);
  }
}
