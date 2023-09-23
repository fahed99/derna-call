import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { FC, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
  // const { requestID } = props;
  const [isOpen, setIsOpen] = useState(false);
  // const [popUpDataID, setPopUpDataID] = useState(1);
  const { data: requestAids, isLoading, isError } = useRequests();
  const [selectedRequestData, setSelectedRequestData] =
    useState<AidRequest | null>(null);

  const handleClick = (request: AidRequest) => {
    setSelectedRequestData(request);
    setIsOpen(true);
  };

  return (
    <div className="h-screen flex items-center flex-col gap-4">
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
      <div dir="rtl" className="w-[85%] max-w-[1200px] text-grey-100 font-semibold text-2xl">
        طلبات المساعدة المتاحة حاليا
      </div>

      <div dir="rtl" className="w-[85%] max-w-[1200px] justify-center sm:justify-start grid gap-10 md:gap-6">
        {isLoading && (
          <p className="w-full flex justify-center">يتم التحميل الآن</p> 
        )}

        {isError && (
          <div className="w-full mt-6 text-red font-semibold text-xl rounded-xl border-2 border-grey-50 flex justify-center py-4 px-4">
            حدث خطأ
          </div>
        )}

        {!requestAids?.length && (
          <div className="w-full mt-6 text-primary font-semibold text-xl rounded-xl border-2 border-grey-50 flex justify-center py-4 px-4">
            لا يوجد طلبات حاليا
          </div>
        )}
        {requestAids?.length
          ? requestAids.map((request) => (
              <ListItem
                key={request.id}
                id={request.id}
                onClick={() => handleClick(request)}
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

  await queryClient.prefetchQuery(['aidRequests'], () => getRequests());

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
