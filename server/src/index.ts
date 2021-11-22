import express from 'express'
import {PrismaClient} from '@prisma/client'
import routes from './routes'
import cors from 'cors'

const bodyParser = require('body-parser');

const init = async () => {
    const app = express()
    app.use(cors({
        origin: '*'
    }));


    const prisma = new PrismaClient()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api', await routes(prisma))
    //routes(prisma)
    app.listen(4000, () => {
        console.log("run on 4000")
    })
}

(async () => await init())()
