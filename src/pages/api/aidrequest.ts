import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { DateConverter } from 'src/utils/DateConverter';

const prisma = new PrismaClient();

const aidRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  // Set the CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Note: In production, replace '*' with your actual origin like 'http://localhost:3000'
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    // Handle the preflight (OPTIONS) request
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    // if (req.query.secret !== process.env.AID_REQUEST_TOKEN) {
    //   return res.status(401).json({ message: 'Invalid token' });
    // }

    const {
      firstName,
      address,
      category,
      description,
      familyMembers,
      phoneNum1,
      phoneNum2,
      tweetId,
      status
    } = req.body;

    const aidRequest = await prisma.aidRequest.create({
      data: {
        firstName,
        address,
        category,
        description,
        dateAdded: DateConverter(new Date()),
        familyMembers,
        phoneNum1,
        phoneNum2,
        tweetId,
        status
      }
    });

    return res.status(201).json(aidRequest);
  }

  if (req.method === 'GET') {
    const { id, status } = req.query;

    // Check if an ID was provided in the query
    if (id) {
      const aidRequest = await prisma.aidRequest.findFirst({
        where: {
          id: Number(id)
        }
      });

      if (!aidRequest) {
        return res.status(404).json({ message: 'Aid Request not found' });
      }

      return res.status(200).json(aidRequest);
    }

    if (status) {
      if (
        status === 'open' ||
        status === 'pending' ||
        status === 'resolved' ||
        status === 'closed'
      ) {
        // If no ID provided, return all aidRequests
        const aidRequests = await prisma.aidRequest.findMany({
          where: {
            status: status
          }
        });
        res.status(200).json(aidRequests);
      } else {
        res
          .status(400)
          .json({
            message:
              'Please use an existing status such as: open, closed, pending, resolved'
          });
      }
    } else {
      // If neither ID nor status is provided, return all aidRequests
      const allAidRequests = await prisma.aidRequest.findMany();
      res.status(200).json(allAidRequests);
    }
  }

  if (req.method === 'DELETE') {
    if (req.query.secret !== process.env.AID_REQUEST_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { id } = req.query;

    if (!id) {
      return res.status(422).end('Must Include ID');
    }

    let aidRequest = await prisma.aidRequest.findFirst({
      where: {
        id: Number(id)
      }
    });

    if (!aidRequest) {
      return res.status(404).end('Aid Request Not Found');
    }

    aidRequest = await prisma.aidRequest.delete({
      where: {
        id: Number(id)
      }
    });

    return res.json(aidRequest);
  }

  if (req.method === 'PUT') {
    if (req.query.secret !== process.env.AID_REQUEST_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { id } = req.query;

    if (!id) {
      return res.status(422).end('Must Include ID');
    }

    let aidRequest = await prisma.aidRequest.findFirst({
      where: {
        id: Number(id)
      }
    });

    if (!aidRequest) {
      return res.status(404).end('Aid Request Not Found');
    }

    const {
      firstName,
      address,
      category,
      description,
      familyMembers,
      dateAdded,
      dateResolved,
      phoneNum1,
      phoneNum2,
      tweetId,
      status
    } = req.body;

    aidRequest = await prisma.aidRequest.update({
      where: {
        id: Number(id)
      },
      data: {
        firstName,
        address,
        category,
        description,
        familyMembers,
        dateAdded,
        dateResolved,
        phoneNum1,
        phoneNum2,
        tweetId,
        status
      }
    });

    return res.json(aidRequest);
  }

  if (req.method === 'PATCH') {
    // if (req.query.secret !== process.env.AID_REQUEST_TOKEN) {
    //   return res.status(401).json({ message: 'Invalid token' });
    // }

    const { id } = req.query;

    if (!id) {
      return res.status(422).end('Must Include ID');
    }

    let aidRequest = await prisma.aidRequest.findFirst({
      where: {
        id: Number(id)
      }
    });

    if (!aidRequest) {
      return res.status(404).end('Aid Request Not Found');
    }

    aidRequest = await prisma.aidRequest.update({
      where: {
        id: Number(id)
      },
      data: {
        ...req.body
      }
    });

    return res.json(aidRequest);
  }

  return res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default aidRequest;
