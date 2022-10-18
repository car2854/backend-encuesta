import { validationResult  } from 'express-validator';
import { Response, Request } from 'express';

const validateFields = (req: Request, res: Response, next: any) => {
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()){
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    });
  }

  next();
}

export default validateFields