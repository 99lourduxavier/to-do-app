import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { sequelize } from './models';
import todoRoutes from './routes/todoRoutes';
import authRoutes from './routes/authRoutes';

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

// 404 Not Found Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Sync the Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced successfully');

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
