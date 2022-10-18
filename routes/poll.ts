import { Router } from "express";
import { check } from "express-validator";
import { createPoll, deletePoll, getPoll, getMyPolls, updatePoll, getPollsPublic, acticatedPoll, getVotedPolls } from "../controllers/poll";
import validateFields from "../middlewares/validateFiels";
import validateJwt from "../middlewares/validateJwt";

const pollRouter = Router();

pollRouter.get('/', validateJwt ,getMyPolls);
pollRouter.get('/public', validateJwt, getPollsPublic);
pollRouter.get('/getVotedPolls', validateJwt, getVotedPolls);
pollRouter.get('/:id', validateJwt ,getPoll);
pollRouter.post('/', [
  validateJwt,
  check('description', 'La descripcion es obligatorio').notEmpty(),
  check('end_poll', 'La fecha para la finalizacion de la encuesta es invalida').notEmpty(),
  check('category_id', 'La categoria es obligatorio').notEmpty(),
  validateFields
],createPoll);
pollRouter.delete('/:id', validateJwt, deletePoll);
pollRouter.put('/:id', validateJwt, updatePoll);
pollRouter.put('/activate/:id', validateJwt, acticatedPoll);

export default pollRouter;