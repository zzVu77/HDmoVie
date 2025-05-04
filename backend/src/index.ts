import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import 'reflect-metadata'
import { AppDataSource } from './data-source'
import blogRouter from './routes/blog.route'
import commentRouter from './routes/comment.route'
import genreRouter from './routes/genre.route'
import likeInteractionRouter from './routes/interaction.router'
import movieRouter from './routes/movie.route'
import notificationRouter from './routes/notification.route'
import profileRouter from './routes/profile.route'
import registeredUserRouter from './routes/registeredUser.route'
import reportRouter from './routes/report.route'
import tagRouter from './routes/tag.route'
import watchlistRouter from './routes/watchlist.route'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
const port = process.env.PORT || 3001

// API routes
app.use('/api/movies', movieRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/reports', reportRouter)
app.use('/api/comments', commentRouter)
app.use('/api/registeredusers', registeredUserRouter)
app.use('/api/genres', genreRouter)
app.use('/api/tags', tagRouter)
app.use('/api/comments', commentRouter)
app.use('/api/like', likeInteractionRouter)
app.use('/api/notifications', notificationRouter)
app.use('/api/registeredUser', registeredUserRouter)
app.use('/api/profiles', profileRouter)
app.use('/api/watchlists', watchlistRouter)

app.get('/', (req, res) => {
  res.send('HDmoVie API is running')
})

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected')
    app.listen(port, () => {
      console.log(`Server running on http://${process.env.MYSQLHOST || 'localhost'}/${process.env.MYSQLPORT || 3001}`)
    })
  })
  .catch((error) => console.log('Error connecting to database:', error))
