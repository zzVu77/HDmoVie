import { createClient } from 'redis'

export const redisClient = createClient({
  socket: {
    host: 'localhost',
    port: 6379,
  },
})

redisClient.on('error', (err) => console.error('Redis Client Error', err))

// Connect immediately
;(async () => {
  await redisClient.connect()
})()
