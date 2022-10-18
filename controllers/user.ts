import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from "../models/user";
import generateJwt from '../helpers/generateJwt';

const createUser = async(req:Request, res:Response) => {
  try {

    const userDB = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (userDB){
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya esta siendo utilizado'
      });
    }

    const pass = bcryptjs.genSaltSync();
    const newPass = bcryptjs.hashSync(req.body.password, pass);

    req.body.password = newPass;

    const user = await User.create(req.body);

    const token = await generateJwt(user.id);

    return res.json({
      ok: true,
      user,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

export {
  createUser
}