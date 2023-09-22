import { useQuery } from '@tanstack/react-query';
import { AidRequest } from '@customTypes/AidRequest';

const getRequests = async (): Promise<AidRequest[]> => {
  return await fetch(`https://dernacall.ly/api/aidrequest`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
};

const getRequestByID = async (requestID: string): Promise<AidRequest> => {
  return await fetch(`https://dernacall.ly/api/aidrequest?id=${requestID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
};

const useRequests = () => {
  return useQuery(['aidRequests'], () => getRequests());
};

export { useRequests, getRequests, getRequestByID };
