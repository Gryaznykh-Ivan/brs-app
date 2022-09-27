import Router from 'koa-router'
import adminController from '../controllers/admin'
import roleFilter from '../middlewares/roleFilter';

const router = new Router().prefix("/admin");

// Admin settings

router.put("/createUser", roleFilter("ADMIN"), adminController.createUser);
router.post("/changeUserSettings/:id", roleFilter("ADMIN"), adminController.changeUserSettings);
router.delete("/removeUser/:id", roleFilter("ADMIN"), adminController.removeUser);


export default router.routes();