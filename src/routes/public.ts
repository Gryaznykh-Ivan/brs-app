import Router from 'koa-router'
import userController from '../controllers/user'
import groupController from '../controllers/group'

const router = new Router();

router.get("/user/search", userController.getUsersBySearch);
router.get("/user/:id", userController.getUserById);

router.post("/settings/changeGeneral", userController.generalSettingsChange);
router.post("/settings/changePassword", userController.changePassword);

export default router.routes();