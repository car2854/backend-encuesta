import { Router } from "express";
import { check } from "express-validator";
import { addVoteOption, createOption, deleteOption, getDetailsOptionComplete, getOptions, getOptionsPublic, removeVoteOption } from "../controllers/option";
import validateFields from "../middlewares/validateFiels";
import validateJwt from "../middlewares/validateJwt";

const optionRouter = Router();

optionRouter.get('/:id', validateJwt, getOptions);
optionRouter.get('/public/:id', validateJwt, getOptionsPublic);
optionRouter.get('/getDetailsOptionComplete/:id', validateJwt, getDetailsOptionComplete);

optionRouter.post('/', [
  validateJwt,
  check('name', 'El nombre es obligatorio').notEmpty(),
  check('poll_id', 'La encuesta es obligatorio').notEmpty(),
  validateFields
],createOption);

optionRouter.put('/add/:id', validateJwt, addVoteOption);
optionRouter.put('/remove/:id', validateJwt, removeVoteOption);

optionRouter.delete('/:id', validateJwt, deleteOption);

export default optionRouter;