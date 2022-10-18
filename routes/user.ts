import { Router } from "express";
import { createUser } from "../controllers/user";

import { check } from 'express-validator';
import validateFields from "../middlewares/validateFiels";

const userRouter = Router();

userRouter.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es invalido').isEmail(),
  check('password', 'La contraseña es obligatorio').not().isEmpty(),
  validateFields
], createUser);

export default userRouter;