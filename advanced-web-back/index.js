import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import indexRouter from './routes/index.js'
import authRouter from './routes/auth.js'
import recipeRouter from './routes/recipe.js'

const app = express();

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cors());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/recipes', recipeRouter);

mongoose.set('strictQuery', false);

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.error('Failed to connect to DB', err);
        } else {
            console.log('Connected to DB');
        }
    }
);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
