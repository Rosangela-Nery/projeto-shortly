import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import shortlyRoutes from './routes/shortlyRoutes.js';

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.use(shortlyRoutes);

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    console.log(`Server open in: ${PORT}`)
});