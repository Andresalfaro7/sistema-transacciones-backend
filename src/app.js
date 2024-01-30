import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import cardsRoutes from './routes/cards.routes.js';
import flowsRoutes from './routes/flows.routes.js';
import transactionsRoutes from './routes/transactions.routes.js';
import transfersRoutes from './routes/transfers.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', cardsRoutes);
app.use('/api', flowsRoutes);
app.use('/api', transactionsRoutes);
app.use('/api', transfersRoutes);

export default app;