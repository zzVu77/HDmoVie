// ~/config/redis.ts
import { createClient } from 'redis'
import dotenv from 'dotenv'
dotenv.config()

export const redisClient = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
})

redisClient.on('error', (err) => console.error('Redis Client Error:', err))
;(async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect()
  }
})()
