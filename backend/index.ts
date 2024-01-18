import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// dotenv:
import dotenv from 'dotenv';
dotenv.config();

// Import routes
import uploadRouter from './routes/upload.ts';
import downloadRouter from './routes/download.ts';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/upload', uploadRouter);
app.use('/', downloadRouter);

app.listen(3001, () => console.log('Listening on port 3001'));
