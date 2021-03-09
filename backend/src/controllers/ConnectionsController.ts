import { Request, Response } from "express";
import db from "../database/connection";

export default class ConnectionsController {
  async index(req: Request, res: Response) {
    try {
      const totalConnections = await db('connections').count('* as total');

      const { total } = totalConnections[0];
      
      return res.json({total})
    } catch(error) {
      return res.status(400).json({
        error: 'Unexpected error while listing connections.'
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const users = await db('users').where('users.id', '=', userId);

      const user = users[0];

      if(!user) {
        return res.status(400).json({
          error: 'User does not found.'
        });
      }

      await db('connections').insert({
        userId
      });

      return res.status(201).send();
    } catch(error) {
      return res.status(400).json({
        error: 'Unexpected error while creating new connection.'
      });
    }
  }
}