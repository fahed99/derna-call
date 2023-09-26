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
import NoRequests from '@images/no-requests.png';
import GuidePopUp from '@components/GuidePopUp';
import Button from '@components/Button';

type Props = {
  requestID?: string;
};

const RequestsList: NextPage<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: requestAidsOpen, isLoading, isError } = useRequests('open');
  const { data: requestAidsPending } = useRequests('pending');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedRequestData, setSelectedRequestData] =
    useState<AidRequest | null>(null);

  const handleClick = (request: AidRequest) => {
    setSelectedRequestData(request);
    setIsOpen(true);
  };

  return (
    <>
      <GuidePopUp
        isOpen={isPopUpOpen}
        setIsOpen={setIsPopUpOpen}
        type="aider"
      />
      <div dir="rtl" className="h-full pb-14 flex items-center flex-col gap-4">
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
              className="flex flex-col px-2 md:px-16 text-grey-100 font-semibold text-2xl pb-8 items-center text-center">
              <div className="order-2">
                طلبات المساعدة المتاحة حاليا
              </div>
              <div
                dir="rtl"
                onClick={() => setIsPopUpOpen(true)}
                className="w-fit text-sm order-1 text-primary pr-2 py-2 cursor-pointer underline">
                الارشادات والتعليمات💡
              </div>
            </div>

            <div
              dir="rtl"
              className="w-full px-2 md:px-16 justify-center gap-10 md:gap-10 lg:gap-10">
              {isLoading && (
                <p className="w-full flex justify-center">يتم التحميل الآن</p>
              )}
              {isError && (
                <p className="w-full text-center text-red-600 font-semibold text-xl justify-center">
                  حدث خطأ
                </p>
              )}

              {!requestAidsOpen?.length && (
                <div className="w-full flex flex-col items-center justify-center">
                  <div className="md:w-[30%] lg:w-[30%] xl:w-[40%] w-[35%]">
                    <Image src={NoRequests} alt="no-requests" />
                  </div>
                  <div className="md:w-[60%] lg:w-[50%] w-[35%] flex flex-col items-center pt-2 gap-3">
                    <p className="text-primary-100 font-semibold">
                      لا يوجد طلبات حالياً
                    </p>
                    <Link href={'/submit'}>
                      <Button
                        className="w-fit whitespace-nowrap"
                        type="secondary"
                        title="اطلب الدعم الآن"
                      />
                    </Link>
                  </div>
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
          <div>
            <div
              dir="rtl"
              className="flex flex-col px-2 md:px-16 text-grey-100 font-semibold text-2xl pb-8 items-center text-center">
              طلبات المساعدة قيد التنفيذ
            </div>
            <div
              dir="rtl"
              className="w-full flex px-2 md:px-16 justify-center sm:justify-start grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-10 lg:gap-10">
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
                <div className="w-full text-center text-primary-100 font-semibold">
                    لا يوجد طلبات حالياً
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
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
