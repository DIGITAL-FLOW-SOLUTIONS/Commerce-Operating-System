import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import statsRouter from "./stats";
import storesRouter from "./stores";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(statsRouter);
router.use(storesRouter);

export default router;
