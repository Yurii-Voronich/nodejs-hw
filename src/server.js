import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import { connectDatabase } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger);

app.use('/notes', notesRoutes);
app.use('/auth', authRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectDatabase();

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
