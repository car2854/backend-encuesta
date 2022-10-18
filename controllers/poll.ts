import { Request, Response } from 'express';
import Poll from '../models/poll';
import Option from '../models/option';
import Category from '../models/categorie';
import { Op, Sequelize, where } from 'sequelize';
import User from '../models/user';
import Participate from '../models/particitape';

const getVotedPolls = async(req:any, res:Response) => {
  try {

    const polls = await Poll.findAll({
      
      include: [
        {model: Category},
        {model: User},
        {model: Option},
        {model: Participate, 
          where: {
            user_id: req.uid
          },
        }
      ],
      where: {
        status: true,
        user_id: {
          [Op.not]:req.uid
        },
        is_active: true
      },
      order: [
        ['init_poll', 'ASC'],
      ],
    });

    return res.json({
      ok: true,
      polls
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

// Validar las fechas, para que las encuestas que se muestren esten en el rango de fechas
const getPollsPublic = async(req:any, res:Response) => {
  try {
    const polls = await Poll.findAll({
      
      include: [
        {model: Category},
        {model: User},
        {model: Option},
        {model: Participate, 
          // where: {
          //   user_id: null
          // },
        }
      ],
      where: {
        status: true,
        user_id: {
          [Op.not]:req.uid
        },
        init_poll: {
          [Op.lte]:Date.now()
        },
        end_poll: {
          [Op.gte]:Date.now()
        },
        is_active: true
      },
      order: [
        ['init_poll', 'ASC'],
      ],
    });

    return res.json({
      ok: true,
      polls
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

const getMyPolls = async(req:any, res:Response) => {
  try {

    const polls = await Poll.findAll({
      where: {
        user_id: req.uid,
        status: true
      },
      include: [
        {model: Category},
        {model: User}
      ],
      order: [
        ['id', 'DESC'],
      ]
    });

    return res.json({
      ok: true,
      polls
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

const getPoll = async(req:Request, res:Response) => {
  try {

    const poll = await Poll.findOne(
      {
        where: {
          id: req.params.id,
          status: true,
        },
        include: [
          {model: Option}
        ]
      }
    );

    if (!poll){
      return res.status(404).json({
        ok: false,
        msg: 'No existe esa encuesta'
      })
    }

    return res.json({
      ok: true,
      poll
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

const acticatedPoll = async(req:Request, res:Response) => {
  try {

    const [poll, amountPoll] = await Promise.all([
      Poll.findOne({
        where: {
          id: req.params.id
        }
      }),
      Option.count({
        where: {
          poll_id: req.params.id
        }
      })
    ]);

    if (!poll){
      return res.status(404).json({
        ok: false,
        msg: 'No existe esa encuesta'
      });
    }


    if (amountPoll < 2){
      return res.status(400).json({
        ok: false,
        msg: 'No se puede activar, debe tener minimo 2 opciones'
      });
    }
    
    poll.is_active = true;
    await poll.save();
    
    return res.json({
      ok: true,
      poll
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

const createPoll = async(req:any, res:Response) => {
  try {

    if (req.body.end_poll <= req.body.init_poll){
      return res.status(400).json({
        ok: false,
        msg: 'La fecha de finalizacion no debe ser menor o igual a la fecha de inicio'
      });
    }

    const data = {
      ...req.body,
      user_id: req.uid
    }

    const newPoll = await Poll.create(data);

    const poll = await Poll.findOne({
      where: {
        id :newPoll.id
      },
      include: [
        {model: Category},
        {model: User}
      ]
    });

    return res.json({
      ok: true,
      newPoll: poll
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

// TODO: falta el update
const updatePoll = async(req:Request, res:Response) => {
  try {

    return res.json({
      ok: true,
      msg: 'updatePoll'
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

const deletePoll = async(req:Request, res:Response) => {
  try {

    const poll = await Poll.findOne({
      where: {
        id: req.params.id,
        status: true
      }
    });

    if (!poll){
      return res.status(404).json({
        ok: false,
        msg: 'No existe esa encuesta'
      });
    }

    poll.status = false;
    await poll.save();

    return res.json({
      ok: true,
      poll
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
  getPollsPublic,
  getMyPolls,
  getPoll,
  createPoll,
  deletePoll,
  updatePoll,
  acticatedPoll,
  getVotedPolls
}