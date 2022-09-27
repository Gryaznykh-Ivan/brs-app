import Router from 'koa-router'
import auth from '../controllers/auth'

const router = new Router().prefix('/auth');

router.post('/login', auth.login);
router.put('/register', auth.register);
router.post('/loginThroughEmail', auth.loginThroughEmail);
router.post('/sendVerificationCode', auth.sendVerificationCode);

export default router.routes();