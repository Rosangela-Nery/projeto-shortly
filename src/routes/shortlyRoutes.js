import express from 'express';
import { signupPost } from '../controllers/signupControllers.js';
import { signinPost } from '../controllers/signinControllers.js';
import { isAuthenticated, hasUser } from '../middlewares/shortlyMiddlewares.js';
import { urlsPost, urlsIdGet, urlsOpenGet } from '../controllers/urlsControllers.js';

const router = express.Router();

router.post("/signup", signupPost);
router.post("/signin", signinPost);

router.post("/urls/shorten", [isAuthenticated, hasUser], urlsPost);
router.get("/urls/:id", urlsIdGet);
router.get("/urls/open/:shortUrl", urlsOpenGet);
router.delete("/urls/:id");

router.get("/users/me");

router.get("/ranking");


export default router; 