import express, { Application } from 'express';
import cors from 'cors';
import db from './dbConnection';
import userRouter from '../routes/user';
import authRouter from '../routes/auth';
import categoryRouter from '../routes/category';
import pollRouter from '../routes/poll';
import optionRouter from '../routes/option';
class Server {

  private app: Application;
  private port: string;

  constructor(){
    this.app = express();
    this.port = process.env.PORT || '4000';

    this.middleware();
    this.dbConnection();
    this.router();
  }

  private dbConnection = async() => {
    try {
      await db.authenticate();
      console.log('Database connected');
      
    } catch (error:any) {
      throw new Error(error);
    }
  }

  private router = () => {
    this.app.use('/api/user', userRouter);
    this.app.use('/api/auth', authRouter);
    this.app.use('/api/category', categoryRouter);
    this.app.use('/api/poll', pollRouter);
    this.app.use('/api/option', optionRouter);
  }

  private middleware = () => {
    this.app.use(cors());
    this.app.use(express.json())
  }

  public listen = () => {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

export default Server;