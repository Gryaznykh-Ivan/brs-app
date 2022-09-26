import Router from 'koa-router'

import authRouter from './auth'
import publicRouter from './public'
import privateRouter from './private'

import JwtParser from '../middlewares/jwtParser'
import JwtFilter from '../middlewares/jwtFilter'

const router = new Router();

router.use(authRouter);
router.use(JwtParser); // Парсим токен
router.use(JwtFilter); // Фильтрует запросы без токена
router.use(publicRouter);
router.use(privateRouter);

export default router;