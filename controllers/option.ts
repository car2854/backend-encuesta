import { Request, Response } from 'express';

import Option from '../models/option';
import Participate from '../models/particitape';
import Poll from '../models/poll';
import User from '../models/user';

const removeVoteOption = async(req:Request, res:Response) => {
  try {

    const option = await Option.findByPk(req.params.id, {
      include: Poll
    });

    if (!option){
      return res.status(404).json({
        ok: false,
        msg: 'No existe esa opcion'
      });
    }

    option.amount_vote = option.amount_vote - 1;
    await option.save();

    return res.json({
      ok: true,
      option
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

const addVoteOption = async(req:any, res:Response) => {
  try {

    const option = await Option.findByPk(req.params.id);

    if (!option){
      return res.status(404).json({
        ok: false,
        msg: 'No existe esa opcion'
      });
    }

    const participate = await Participate.findAll({
      where: {
        user_id: req.uid,
        poll_id: option.poll_id
      }
    });

    if (participate.length > 0){
      return res.status(400).json({
        ok: false,
        msg: 'Ya has votado en esta encuesta'
      });
    }

    const uid:any = req.uid;
    const poll_id:any = option.poll_id;
    const option_id:any = option.id;

    const data = {
      ...req.data2,
      user_id: uid,
      poll_id: poll_id,
      option_id: option_id
    }
    
    const newParticipate = await Participate.create(data);

    option.amount_vote = option.amount_vote + 1;
    await option.save();

    return res.json({
      ok: true,
      option,
      newParticipate
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

const createOption = async(req:Request, res:Response) => {
  try {

    const [poll, countOption] = await Promise.all([
      Poll.findOne({
        where: {
          id: req.body.poll_id,
          status: true
        }
      }),

      Option.count({
        where: {
          poll_id: req.body.poll_id
        }
      })
    ]);

    if (!poll){
      return res.status(404).json({
        ok: false,
        msg: 'No existe esa encuesta'
      });
    }

    if (countOption >= 8){
      console.log('ya no');
      return res.status(400).json({
        ok: false,
        msg: 'Solo puede publicar 8 opciones'
      });
    }

    console.log('que pasa');
    
    const newOption = await Option.create(req.body);

    return res.json({
      ok: true,
      newOption
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

const deleteOption = async(req:Request, res:Response) => {
  try {

    const option = await Option.findByPk(req.params.id);

    if (!option){
      return res.status(404).json({
        ok: false,
        msg: 'No existe esa opcion'
      });
    }

    await option.destroy();

    return res.json({
      ok: true,
      option
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

const getOptions = async(req:Request, res:Response) => {
  try {

    const options = await Option.findAll({
      where: {
        poll_id: req.params.id
      },
      order: [
        ['id', 'ASC'],
      ],
    });

    

    return res.json({
      ok: true,
      options
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

const getOptionsPublic = async(req:any, res:Response) => {
  try {

    const [options,participate] = await Promise.all([
      Option.findAll({ where: { poll_id: req.params.id }, 
        order: [
          ['id', 'ASC'],
        ],
      }),
      Participate.findOne({where:{user_id: req.uid, poll_id: req.params.id}})
    ]);

    return res.json({
      ok: true,
      options,
      participate
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

const getDetailsOptionComplete = async(req:Request, res:Response) => {
  try {

    console.log(req.params.id);
    

    const detailOption = await Option.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {model: Participate, include: [
          {model: User}
        ]}
      ]
    });

    return res.json({
      ok: true,
      detailOption
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
  createOption,
  deleteOption,
  addVoteOption,
  removeVoteOption,
  getOptions,
  getOptionsPublic,
  getDetailsOptionComplete
}