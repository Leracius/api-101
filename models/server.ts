import express, {Express} from 'express';
import homeRoutes from '../routes/home'
import userRoutes from '../routes/users'
import { dbconection } from '../database/config';
import cors from 'cors'

export class Server {
    app: Express
    port: string | number | undefined
    path: string
    userPath : string

    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.path= '/'
        this.userPath='/auth'

        this.conectarDB()
        this.middlewares()
        this.routes()
    };

    async conectarDB(): Promise<void>{
        await dbconection()
    }

    middlewares(): void {
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(): void{
        this.app.use(this.path, homeRoutes)
        this.app.use(this.userPath, userRoutes)
    }

    listen(): void{
        this.app.listen(this.port, ()=>{
            console.log(`Corriendo en puerto ${this.port}`);            
        });
    };
}