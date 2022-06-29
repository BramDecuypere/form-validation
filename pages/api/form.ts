// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  data?: any;
  errors?: {
    message: string; // Developer readable string
    type: string; // Predefined error codes - "VALIDATION_ERROR"
    path: string; // Path to the property
    trace_id?: string; // identifier of logs if necessary
  }[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    // Example data
    // {
    //   firstName: 'Bram',
    //   lastName: 'Decuypere',
    //   email: 'bram@growmyflow.com',
    //   amountOfJournalPrompts: '8',
    //   journalDate: '2022-06-29'
    // }
    const data = req.body;

    return res.status(200).json({
      data: 'OK'
    })
  } catch (err: any) {    
    // Log to Sentry/logrocket/...
    return res.status(400).send({
      errors: [{
        message: err && err.toString(),
        type: (err && err.type) || 'BAD_REQUEST',
        path: 'firstName',
      }]
    })
  }

}
