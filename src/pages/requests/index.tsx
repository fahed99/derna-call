import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import ListItem from '@components/ListItem';
import Popup from '@components/PopUp';
import Link from 'next/link';
import MainLogo from '@images/main-logo.png';
import { getRequests, useRequests } from '@hooks/getRequests';
import { AidRequest } from '@customTypes/AidRequest';

type Props = {
  requestID?: string;
};

const RequestsList: NextPage<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: requestAidsOpen, isLoading, isError } = useRequests('open');
  const { data: requestAidsPending } = useRequests('pending');
  const [selectedRequestData, setSelectedRequestData] =
    useState<AidRequest | null>(null);

  const handleClick = (request: AidRequest) => {
    setSelectedRequestData(request);
    setIsOpen(true);
  };

  return (
    <div
      dir="rtl"
      className="overflow-scroll h-full pb-14 flex items-center flex-col gap-4">
      <Link
        href={'/'}
        className="w-[240px] md:w-[25%] lg:w-[20%] py-6 flex justify-center">
        <Image priority src={MainLogo} alt="Logo" />
      </Link>
      {selectedRequestData && (
        <Popup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          requestData={selectedRequestData}
        />
      )}
      <div className="flex flex-col gap-12">
        <div>
          <div
            dir="rtl"
            className="w-full px-2 md:px-16 text-grey-100 font-semibold text-2xl pb-8">
            طلبات المساعدة المتاحة حاليا
          </div>

          <div
            dir="rtl"
            className="w-full px-2 md:px-16 justify-center sm:justify-start grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-10 lg:gap-10">
            {isLoading && (
              <p className="w-full flex justify-center">يتم التحميل الآن</p>
            )}

            {isError && (
              <div className="w-full mt-6 text-red font-semibold text-xl rounded-xl border-2 border-grey-50 flex justify-center py-4 px-4">
                حدث خطأ
              </div>
            )}

            {!requestAidsOpen?.length && (
              <div className="w-full mt-6 text-primary font-semibold text-xl rounded-xl border-2 border-grey-50 flex justify-center py-4 px-4">
                لا يوجد طلبات حاليا
              </div>
            )}
            {requestAidsOpen?.length
              ? requestAidsOpen.map((request) => (
                  <ListItem
                    key={request.id}
                    id={request.id}
                    onClick={() => handleClick(request)}
                    status={request.status}
                    aidType={request.category}
                    address={request.address}
                    membersCount={request.familyMembers}
                    date={request.dateAdded}
                    fullDescription={request.description}
                  />
                ))
              : undefined}
          </div>
        </div>
        <div className="w-full text-center text-xl text-primary pt-4">
          <span>• • •</span>
        </div>
        {/* // Change text to "Current pending orders" */}
        <div>
          <div
            dir="rtl"
            className="w-full px-2 md:px-16 text-grey-100 font-semibold text-2xl pb-8">
            طلبات المساعدة قيد التنفيذ
          </div>
          <div
            dir="rtl"
            className="w-full px-2 md:px-16 justify-center sm:justify-start grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-10 lg:gap-10">
            {isLoading && (
              <p className="w-full flex justify-center">يتم التحميل الآن</p>
            )}
            {requestAidsPending?.length ? (
              requestAidsPending.map((request) => (
                <ListItem
                  key={request.id}
                  id={request.id}
                  status={request.status}
                  onClick={() => handleClick(request)}
                  aidType={request.category}
                  address={request.address}
                  membersCount={request.familyMembers}
                  date={request.dateAdded}
                  fullDescription={request.description}
                />
              ))
            ) : (
              // TODO: Change text to "There are currently no pending orders."
              <p className="w-full flex justify-center">يتم التحميل الآن</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RequestsList;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // const requestID = params!.id as string;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000,
        cacheTime: 60000
      }
    }
  });

  await queryClient.prefetchQuery(['aidRequests', 'open'], () =>
    getRequests('open')
  );
  await queryClient.prefetchQuery(['aidRequests', 'pending'], () =>
    getRequests('pending')
  );

  // if (!requestID) {
  // 	return {
  // 		redirect: {
  // 			destination: "/404",
  // 			permanent: false,
  // 		},
  // 	};
  // }

  return {
    props: {
      // requestID,
      dehydratedState: dehydrate(queryClient)
    },
    revalidate: 43200
  };
};
