import Router from 'koa-router'
import userController from '../controllers/user'

const router = new Router();

router.post("/settings/changeGeneral", userController.generalSettingsChange);
router.post("/settings/changePassword", userController.changePassword);

export default router.routes();