import express, { json, urlencoded } from 'express'
import morgan from 'morgan'
import apiRoutes from './routes/index.js'
import cors from 'cors'

const app = express()

app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())
app.use('/api', apiRoutes)

app.listen(3005, () => {
  console.log(`Successfully started the server on PORT : ${3005}`)
})
