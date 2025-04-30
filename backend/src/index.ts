import cors from 'cors'
import 'reflect-metadata'
import express from 'express'
import { AppDataSource } from './data-source'
import movieRouter from './routes/movie.route'
import commentRouter from './routes/comment.route'
import likeInteractionRouter from './routes/interaction.router'
import notificationRouter from './routes/notification.route'
import registeredUserRouter from './routes/registeredUser.route'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3001

app.use('/api/movies', movieRouter)
app.use('/api/comments', commentRouter)
app.use('/api/like', likeInteractionRouter)
app.use('/api/notification', notificationRouter)
app.use('/api/registeredUser', registeredUserRouter)

app.get('/', (req, res) => {
  res.send('HDmoVie API is running')
})

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected')
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`)
    })
  })
  .catch((error) => console.log('Error connecting to database:', error))
