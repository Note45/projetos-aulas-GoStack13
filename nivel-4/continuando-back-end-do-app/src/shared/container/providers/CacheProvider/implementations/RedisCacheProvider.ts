import Redis, { Redis as RedisClient } from "ioredis";
import ICacheProvider from "../models/ICacheProvider";

export default class RedisCacheProvider implements ICacheProvider {
  private cliente: RedisClient;

  constructor() {
    this.cliente = new Redis();
  }

  save(key: string, value: string): Promise<void> {}

  recover(key: string): Promise<string> {}

  invalidate(key: string): Promise<void> {}
}
