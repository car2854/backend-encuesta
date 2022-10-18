import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import generateJwt from '../helpers/generateJwt';
import User from '../models/user';

const login = async(req:Request, res:Response) => {
  try {

    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user){
      return res.status(400).json({
        ok: false,
        msg: 'Datos incorrectos'
      });
    }

    const status = bcryptjs.compareSync(req.body.password, user.password);

    if (!status){
      return res.status(400).json({
        ok: false,
        msg: 'Datos incorrectos'
      });
    }

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

const renewToken = async(req:any, res:Response) => {
  try {

    const user = await User.findByPk(req.uid);

    if (!user){
      return res.status(404).json({
        ok: false,
        msg: 'No existe ese usuario'
      });
    }

    const token = await generateJwt(req.uid);

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
  login,
  renewToken
}