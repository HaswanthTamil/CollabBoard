import { Hono } from "hono";
import { authMiddleware, jwtMiddleware } from "../middleware/authentication";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task";

const router = new Hono();

router.use("*", jwtMiddleware, authMiddleware);

router.post("/:projectId", createTask);
router.get("/:projectId", getTasks);
router.get("/:projectId/:id", getTask);
router.put("/:projectId/:id", updateTask);
router.delete("/:projectId/:id", deleteTask);

export default router;
