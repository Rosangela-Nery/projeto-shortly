import express from 'express';
import { signupPost } from '../controllers/signupControllers.js';

const router = express.Router();

router.post("/signup", signupPost);

export default router;