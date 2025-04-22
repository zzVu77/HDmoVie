// backend/src/index.ts
import cors from 'cors'
import 'reflect-metadata'
import express from 'express'
import { AppDataSource } from './data-source'
import movieRouter from './routes/movie.route'

const app = express()
app.use(cors())
app.use(express.json())
const port = 3001

app.use('/api/movies', movieRouter)

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
