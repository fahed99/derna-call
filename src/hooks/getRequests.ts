import { useQuery } from '@tanstack/react-query';
import { AidRequest } from '@customTypes/AidRequest';

const getRequests = async (
  status?: AidRequest['status']
): Promise<AidRequest[]> => {
  return await fetch(
    `https://dernacall.ly/api/aidrequest${status ? `?status=${status}` : ''}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then((res) => res.json());
};

const useRequests = (status?: AidRequest['status']) => {
  return useQuery(['aidRequests', status ? status : 'all'], () =>
    getRequests(status)
  );
};

export { useRequests, getRequests };
