import express, {Express} from 'express';
import homeRoutes from '../routes/home'

export class Server {
    app: Express
    port: string | number | undefined
    path: string

    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.path= '/'

        this.middlewares()
        this.routes()
    };

    middlewares(): void {
        this.app.use(express.json())
    }

    routes(): void{
        this.app.use(this.path, homeRoutes)
    }

    listen(): void{
        this.app.listen(this.port, ()=>{
            console.log(`Corriendo en puerto ${this.port}`);            
        });
    };
}