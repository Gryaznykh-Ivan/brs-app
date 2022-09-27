import Router from 'koa-router'
import userController from '../controllers/user'
import roleFilter from '../middlewares/roleFilter';

const router = new Router();

// An instance of using roleFilter on specific route
// router.get("/user/:id", roleFilter("ADMIN"), userController.getById); 

// UserController
router.get("/user/search", userController.getBySearch);
router.get("/user/:id", userController.getById);

router.post("/settings/changeGeneral", userController.generalSettingsChange);
router.post("/settings/changePassword", userController.changePassword);


export default router.routes();