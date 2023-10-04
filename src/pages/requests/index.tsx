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
import { NextSeo } from 'next-seo';

const RequestsList: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: requestAidsOpen, isLoading, isError } = useRequests('open');
  const { data: requestAidsPending } = useRequests('pending');
  const { data: requestAidsClose } = useRequests('closed');
  const { data: requestAids } = useRequests();

  const [isPopUpOpen, setIsPopUpOpen] = useState(true);
  const [selectedRequestData, setSelectedRequestData] =
    useState<AidRequest | null>(null);

  const handleClick = (request: AidRequest) => {
    setSelectedRequestData(request);
    setIsOpen(true);
  };
  const Currentsection = 'open'
  const handleSectionChange = (Currentsection : any) => {

  
    const section = document.getElementById(Currentsection);

    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100, 
        behavior: 'smooth', 
      });
    }
   }
  
  return (
    <>
      <NextSeo
        title={`Derna Call - Requests`}
        description={
          'A project to help those damaged by the floods in the great city of Derna.'
        }
      />
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

        <div
          dir="rtl"
          className="flex flex-col px-2 md:px-16 text-grey-100 font-semibold pb-1 text-2xl items-center text-center">
          <div className="order-2">طلبات المساعدة المتاحة حاليا</div>
          <div
            dir="rtl"
            onClick={() => setIsPopUpOpen(true)}
            className="w-fit text-sm order-1 text-primary pr-2 py-2 cursor-pointer underline">
            الارشادات والتعليمات💡
          </div>
        </div>
        <div className='flex gap-2.5'>
        <div
          onClick={() => handleSectionChange('open')}
          className={`rounded-lg shadow-none cursor-pointer font-semibold bg-open text-open-text w-fit py-1 px-2`}>
          {'متاح'} {'('}{requestAidsOpen?.length}{')'}
        </div>
        <div
          onClick={() => handleSectionChange('pending')}
          className={`rounded-lg shadow-none cursor-pointer font-semibold bg-pending text-pending-text w-fit py-1 px-2`}>
          {'قيد التنفيذ'} {'('}{requestAidsPending?.length}{')'}
        </div>
        <div
          onClick={() => handleSectionChange('closed')}
          className={`rounded-lg shadow-none cursor-pointer font-semibold bg-resolved text-resolved-text w-fit py-1 px-2`}>
          {'مغلق'} {'('}{requestAidsClose?.length}{')'}
        </div>
      </div>
        <div
            className={`rounded-lg shadow-none font-semibold text-open-text w-fit py-1 px-2`}>
             {'الكل'}{' '}{'('}{requestAids?.length}{')'}
        </div>
        <section id='open'
          dir="rtl"
          className={`px-2 md:px-16 justify-center items-center ${
            requestAidsOpen?.length
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
              : ''
          } gap-10 md:gap-10 lg:gap-10`}>
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
              <div className="sm:w-[40%] md:w-[40%] flex  lg:w-[35%] xl:w-[25%] w-[35%]">
                <Image src={NoRequests} alt="no-requests" />
              </div>
              <div className="md:w-[60%] lg:w-[50%] w-[35%] flex flex-col items-center pt-2 gap-3">
                <p className="text-primary-100 whitespace-nowrap font-semibold my-20">
                  لا يوجد طلبات حالياً
                </p>
                <Link href={'/form'}>
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
        </section>

        <div className="w-full text-center text-xl text-primary pt-4">
          <span>• • •</span>
        </div>

        <div
          dir="rtl"
          className="flex flex-col px-2 md:px-16 text-grey-100 font-semibold text-2xl pb-1 items-center text-center">
          طلبات المساعدة قيد التنفيذ
        </div>
        <section id ='pending'
          dir="rtl"
          className="px-2 md:px-16 justify-center items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-10 lg:gap-10">
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
            <div className="w-full text-center text-primary-100 font-semibold my-20">
              لا يوجد طلبات حالياً
            </div>
          )}
        </section>
        <div className="w-full text-center text-xl text-primary pt-4">
          <span>• • •</span>
        </div>

        <div
          dir="rtl"
          className="flex flex-col px-2 md:px-16 text-grey-100 font-semibold text-2xl pb-1 items-center text-center">
          طلبات المساعدة المغلقة
        </div>
        <section id ='closed'
          dir="rtl"
          className="px-2 md:px-16 justify-center items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-10 lg:gap-10">
          {isLoading && (
            <p className="w-full flex justify-center">يتم التحميل الآن</p>
          )}
          {requestAidsClose?.length ? (
            requestAidsClose.map((request) => (
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
            <div className="w-full text-center text-primary-100 font-semibold my-20">
              لا يوجد طلبات حاليا
            </div>
          )}
        </section>
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
