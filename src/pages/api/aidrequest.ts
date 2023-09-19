import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const aidRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    if (req.query.secret !== process.env.AID_REQUEST_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { first_name, address, category, description, familyMembers, phoneNum1, phoneNum2, tweet_id, status } = req.body;

    const aidRequest = await prisma.aidRequest.create({
      data: {
        first_name,
        address,
        category,
        description,
        date_added: new Date().toISOString(),
        familyMembers,
        phoneNum1,
        phoneNum2,
        tweet_id,
        status,
      },
    });

    return res.status(201).json(aidRequest);
  }

  if (req.method === 'GET') {
    const aidRequests = await prisma.aidRequest.findMany();
    return res.status(200).json(aidRequests);
  }

  if (req.method === 'DELETE') {
    if (req.query.secret !== process.env.AID_REQUESTS_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { id } = req.query;

    if (!id) {
      return res.status(422).end('Must Include ID');
    }

    let aidRequest = await prisma.aidRequest.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!aidRequest) {
      return res.status(404).end('Aid Request Not Found');
    }

    aidRequest = await prisma.aidRequest.delete({
      where: {
        id: Number(id),
      },
    });

    return res.json(aidRequest);
  }

  if (req.method === 'PUT') {
    if (req.query.secret !== process.env.AID_REQUESTS_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { id } = req.query;

    if (!id) {
      return res.status(422).end('Must Include ID');
    }

    let aidRequest = await prisma.aidRequest.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!aidRequest) {
      return res.status(404).end('Aid Request Not Found');
    }

    const { first_name, address, category, description, familyMembers, date_added, date_resolved, phoneNum1, phoneNum2, tweet_id, status } = req.body;

    aidRequest = await prisma.aidRequest.update({
      where: {
        id: Number(id),
      },
      data: {
        first_name,
        address,
        category,
        description,
        familyMembers,
        date_added,
        date_resolved,
        phoneNum1,
        phoneNum2,
        tweet_id,
        status,
      },
    });

    return res.json(aidRequest);
  }

  return res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default aidRequest;
