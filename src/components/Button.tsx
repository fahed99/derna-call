import { useRequestById } from '@hooks/getRequestByID';
import { FC } from 'react';

interface Props {
  title: string;
  type: 'primary' | 'secondary' | 'check';
  requestID?: string;
}

const LandingCard: FC<Props> = (props) => {
  const { title, type, requestID } = props;
  // TODO: This gives a build erorr. 
  // const handleCall = async () => {
  //   if (requestID) {
  //     const { data: aidRequest } = useRequestById(requestID);
  //     if (aidRequest) {
  //       try {
  //         const response = await fetch(
  //           `https://dernacall.ly/api/aidrequest?id=${requestID}`,
  //           {
  //             method: 'PATCH',
  //             headers: {
  //               'Content-Type': 'application/json'
  //             },
  //             body: JSON.stringify({
  //               callsCount: aidRequest.status + 1
  //             })
  //           }
  //         );

  //         if (!response.ok) {
  //           throw new Error('Failed to update the status');
  //         }
  //       } catch (err) {
  //         throw new Error('err');
  //       }
  //     }
  //   }
  // };

  return (
    <>
      {type === 'primary' ? (
        <div className="h-[50px] shadow-md shadow-grey-50 w-[200px] rounded-3xl bg-primary flex justify-center items-center">
          <p className="text-white text-xl font-semibold">{title}</p>
        </div>
      ) : type === 'check' ? (
        <div className="h-[50px] shadow-md shadow-grey-50 w-[140px] rounded-3xl bg-primary flex justify-center items-center">
          <p className="text-white text-xl font-semibold">{title}</p>
        </div>
      ) : (
        <div className="h-[35px] shadow-lg p-6 shadow-grey-50 w-[100px] rounded-xl bg-primary flex justify-center items-center">
          <p className="text-white text-md font-semibold">{title}</p>
        </div>
      )}
    </>
  );
};

export default LandingCard;
