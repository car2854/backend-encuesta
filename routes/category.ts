import { Router } from "express";
import { getCategories, getCategory } from "../controllers/category";

const categoryRouter = Router();

categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getCategory);

export default categoryRouter;