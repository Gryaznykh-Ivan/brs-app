import Router from 'koa-router'
import adminController from '../controllers/admin'
import groupController from '../controllers/group'
import roleFilter from '../middlewares/roleFilter';

const router = new Router();

// users page routes
router.put("/createUser", roleFilter(["ADMIN"]), adminController.createUser);
router.post("/changeUserSettings/:id", roleFilter(["ADMIN"]), adminController.changeUserSettings);
router.delete("/removeUser/:id", roleFilter(["ADMIN"]), adminController.removeUser);

// group page routes
router.get("/group/search", roleFilter(["ADMIN"]), groupController.getGroupsBySearch);
router.put("/group/:id/addStudentToGroup", roleFilter(["HEADMAN", "ADMIN"]), groupController.addStudentToGroup);
router.get("/group/:id/removeStudentFromGroup", roleFilter(["HEADMAN", "ADMIN"]), groupController.removeStudentFromGroup);
router.get("/group/:id/change", roleFilter(["ADMIN"]), groupController.changeGroupSettings);
router.delete("/group/:id/remove", roleFilter(["ADMIN"]), groupController.removeGroup);

export default router.routes();