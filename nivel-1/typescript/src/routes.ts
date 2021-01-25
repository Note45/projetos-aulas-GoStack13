import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    name: 'Teste',
    email: 'EmailTeste',
    password: '12kffa',
    techs: ['NodeJS', 'ReactJS']
  });

  return response.json({ 
    message: "Hello World!",
    user: user 
  });
};