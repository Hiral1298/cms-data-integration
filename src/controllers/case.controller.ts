import { Request, Response } from 'express';
import CaseModel from '../models/case';

export class CasesController {
  public static async getCasesByCity(req: Request, res: Response): Promise<void> {
    const { startDate, endDate } = req.query;
    let filter: any = {};

    if (startDate && endDate) {
      filter.createdAt = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
    }

    try {
      const cases = await CaseModel.aggregate([
        { $match: filter },
        { $group: { _id: '$city', count: { $sum: 1 } } },
      ]);

      res.json(cases);
    } catch (error) {
      res.status(500).send('Error retrieving data');
    }
  }
}
