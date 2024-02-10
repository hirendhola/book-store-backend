import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRouter from './routes/BookRout.js'
import cors from 'cors'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
    // origin: "http://localhost:5173",
    origin: "bookStore.vercel.app",
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type']
}));
app.use(cors())
app.use(express.json());
// Routes
app.get('/', (req, res) => res.status(200).send('This is new project '));
app.use('/books', bookRouter);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
