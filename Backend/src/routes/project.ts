import { Hono } from "hono";
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/project";
import { jwtMiddleware, authMiddleware } from "../middleware/authentication";

const router = new Hono();

router.use("*", jwtMiddleware, authMiddleware);

router.post("/", createProject);
router.get("/", getProjects);
router.get("/:id", getProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
