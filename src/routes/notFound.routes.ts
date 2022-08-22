import { Request, Response, Router } from "express";

const router = Router();

router.all("*", (request: Request, response: Response) => {
  return response.status(404).json({ error: true, message: "not found" });
});

export default router;
