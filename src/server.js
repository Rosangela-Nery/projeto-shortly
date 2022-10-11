import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.listen(5000, () => {
    console.log("Sever open in 5000")
});