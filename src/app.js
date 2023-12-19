import express from 'express'
import reviewRoutes from './routes.js'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const PORT = 3000

const corsOptions = {
  origin: 'http://localhost:8080'
}

app.use(cors(corsOptions))

app.use('/app', reviewRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
