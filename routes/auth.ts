import { Router } from "express";
import { check } from "express-validator";
import { login, renewToken } from "../controllers/auth";
import validateFields from "../middlewares/validateFiels";
import validateJwt from "../middlewares/validateJwt";

const authRouter = Router();

authRouter.post('/login', [
  check('email', 'El email es invalido').isEmail(),
  check('password', 'La contraseña es obligatorio').not().isEmpty(),
  validateFields
],login);

authRouter.post('/renew', validateJwt ,renewToken);

export default authRouter