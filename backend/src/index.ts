import cors from 'cors'
import 'reflect-metadata'
import express from 'express'
import { AppDataSource } from './data-source'
import cookieParser from 'cookie-parser'
import movieRouter from './routes/movie.route'
import blogRouter from './routes/blog.route'
import reportRouter from './routes/report.route'
import genreRouter from './routes/genre.route'
import tagRouter from './routes/tag.route'
import commentRouter from './routes/comment.route'
import likeInteractionRouter from './routes/interaction.router'
import notificationRouter from './routes/notification.route'
import registeredUserRouter from './routes/registeredUser.route'
import dotenv from 'dotenv'
import profileRouter from './routes/profile.route'
import watchlistRouter from './routes/watchlist.route'
import followRouter from './routes/followInteraction.route'
import rateRouter from './routes/rate.route'
import { authenticateToken } from './middlewares/auth.middleware'
dotenv.config()

const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)
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
app.use('/api/profiles', authenticateToken, profileRouter)
app.use('/api/watchlists', watchlistRouter)
app.use('/api/follow', followRouter)
app.use('/api/rates', rateRouter)

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
