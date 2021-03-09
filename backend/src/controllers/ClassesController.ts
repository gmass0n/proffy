import db from "../database/connection";
import convertHourtToMinutes from "../utils/convertHourToMintues";
import { Request, Response, response } from "express";

interface ScheduleItem {
  weekDay: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(req: Request, res: Response) {
   try {
    const filters = req.query;

    const weekDay = filters.weekDay as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if(!weekDay || !subject || !time) {
      return res.status(400).json({
        error: 'Missing filters to search classes.'
      });
    }

    const timeInMinutes = convertHourtToMinutes(time);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('classSchedule.*')
          .from('classSchedule')
          .whereRaw('`classSchedule`.`classId` = `classes`.`id`')
          .whereRaw('`classSchedule`.`weekDay` = ??', [Number(weekDay)])
          .whereRaw('`classSchedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`classSchedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.userId', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    res.json(classes);
   } catch(error) {
    return res.status(400).json({
      error: 'Unexpected error while listing classes.'
    });
   }
  }

  async create(req: Request, res: Response) {
    const { 
      name, 
      avatar, 
      whatsapp, 
      bio, 
      subject, 
      cost, 
      schedule 
    } = req.body;
  
    const trx = await db.transaction();
  
    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      });
    
      const userId = insertedUsersIds[0];
    
      const insertedClassesId = await trx('classes').insert({
        subject,
        cost,
        userId
      })
    
      const classId = insertedClassesId[0];
    
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          classId,
          weekDay: scheduleItem.weekDay,
          from: convertHourtToMinutes(scheduleItem.from),
          to: convertHourtToMinutes(scheduleItem.to),
        }
      })
    
      await trx('classSchedule').insert(classSchedule);
    
      await trx.commit();
    
      return res.status(201).send();
    } catch(error) {
      await trx.rollback();
  
      return res.status(400).json({
        error: 'Unexpected error while creating new class.'
      });
    }
  }
}