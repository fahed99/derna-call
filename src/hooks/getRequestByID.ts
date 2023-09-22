import { useQuery } from '@tanstack/react-query';
import { AidRequest } from '@customTypes/AidRequest';

const getRequestByID = async (requestID: string): Promise<AidRequest> => {
  return await fetch(`https://dernacall.ly/api/aidrequest?id=${requestID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
};

const useRequestById = (requestID: string) => {
  return useQuery(['aidRequest', requestID], () => getRequestByID(requestID));
};

export { useRequestById, getRequestByID };
