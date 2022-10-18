import { Request, Response } from 'express';
import Category from '../models/categorie';

const getCategories = async(req:Request, res:Response) => {
  try {

    const categories = await Category.findAll();

    return res.json({
      ok: true,
      categories
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Check with the administrator'
    });
  }
}

const getCategory = async(req:Request, res:Response) => {
  try {

    const category = await Category.findByPk(req.params.id);

    return res.json({
      ok: true,
      category
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
  getCategory,
  getCategories,
}