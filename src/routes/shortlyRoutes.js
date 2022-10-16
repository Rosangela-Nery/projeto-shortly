import express from 'express';
import { signupPost } from '../controllers/signupControllers.js';
import { signinPost } from '../controllers/signinControllers.js';
import { signupValidation } from '../middlewares/shortlyMiddlewares.js';

const router = express.Router();

router.post("/signup", signupPost);
router.post("/signin", signinPost);

export default router; 