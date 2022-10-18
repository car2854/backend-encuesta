import jwt from 'jsonwebtoken';

const generateJwt = async(uid:number) => {

  return new Promise((resolve, reject) => {
    const payload = {
      uid
    }

    if (process.env.JWT_SECRET){
      jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '128h'
      }, (err, token) => {
        if (err){
          console.log(err);
          reject('No se pudo generar el token');
        }else{
          resolve(token);
        }
      });
    }else{
      reject('Falta la llave de la aplicacion');
    }
  });

}


export default generateJwt;