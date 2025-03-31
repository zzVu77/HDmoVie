// backend/src/index.ts
import cors from 'cors'
import express from 'express'

const app = express()
const port = 3001

app.use(cors())

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
