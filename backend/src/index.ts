// backend/src/index.ts
import cors from 'cors'
import 'reflect-metadata'
import express from 'express'
import { AppDataSource } from './data-source'
import movieRouter from './routes/movie.route'
import commentRouter from './routes/comment.route' // Import commentRouter
import likeInteractionRouter from './routes/interaction.router' // Import commentRouter

const app = express()
app.use(cors())
app.use(express.json())
const port = 3001

app.use('/api/movies', movieRouter)
app.use('/api/comments', commentRouter) // Thêm route cho comment
app.use('/api/like', likeInteractionRouter) // Thêm route cho comment

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
