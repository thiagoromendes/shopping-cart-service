import 'dotenv/config'
import './database'
import express from 'express'
import cors from 'cors'
import routes from './routes'
import appConfig from './config/app'

const app = express()

app.use(cors());
app.use(express.json());
app.use(routes);

const port = appConfig.app.port

app.listen(port, () => console.log('Service Product Started'))