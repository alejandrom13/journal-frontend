// pages/api/check-calendar-link.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Implement this function to check if the user has linked their calendar
  // Example using a hypothetical database client:
  // const integration = await db.integrations.findUnique({
  //   where: { user_id: req.user.id },
  // });
  
  // const isLinked = !!integration;

  const isLinked = false; // Replace with actual implementation

  res.status(200).json({ isLinked });
}