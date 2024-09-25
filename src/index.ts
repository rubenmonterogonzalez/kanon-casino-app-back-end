import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import gameRoutes from './routes/gameRoutes';
import slotRoutes from './routes/slotRoutes';

const app = express();
const port = process.env.PORT || 3002;

app.use(cors({
  origin: ['https://kanon-casino-app-front-end.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));
app.options('*', cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/slots', slotRoutes);
app.get('/', (req: Request, res: Response) => res.send({ ok: 'true' }));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', 'https://kanon-casino-app-front-end.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204); // No Content
  } else {
    next();
  }
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export { app, server };
export default app;