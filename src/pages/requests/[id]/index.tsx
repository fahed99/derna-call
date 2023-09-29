import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import PlanesBackground from '@components/PlanesBackground';
import ValuedFields from '@components/ValuedFields';
import Link from 'next/link';
import Image from 'next/image';
import MainLogo from '@images/main-logo.png';
import Button from '@components/Button';
import { getRequestByID, useRequestById } from '@hooks/getRequestByID';
import { useState } from 'react';
import { useRouter } from 'next/router';
import CallPopUp from '@components/CallPopUp';
import { NextSeo } from 'next-seo';

type Props = {
  requestID: string;
};

const Request: NextPage<Props> = (props: Props) => {
  const { requestID } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { data: aidRequest } = useRequestById(requestID);
  if (!aidRequest?.id) {
    return <></>;
  }

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);
    setIsPopUpOpen(true);

    try {
      const response = await fetch(
        `https://dernacall.ly/api/aidrequest?id=${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: 'pending'
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update the status');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NextSeo
        title={`Request #${id}`}
        description={
          'A project to help those damaged by the floods in the great city of Derna.'
        }
      />
      <CallPopUp
        isOpen={isPopUpOpen}
        setIsOpen={setIsPopUpOpen}
        requestData={aidRequest}
      />
      <div className="overflow-y-scroll w-full min-h-[900px] h-screen flex flex-col items-center gap-6">
        <Link
          href={'/'}
          className="w-[240px] md:w-[25%] lg:w-[20%] flex justify-center">
          <Image priority src={MainLogo} alt="Logo" />
        </Link>

        <div className="w-full flex justify-center text-xl sm:text-3xl font-bold text-grey-100">
          بيانات أهلنا
        </div>
        <div className="flex max-w-[720px] max-h-[520px] sm:max-h-none w-full px-4 justify-center">
          <div className="font-semibold relative text-xl w-full shadow-lg shadow-grey-100 rounded-xl py-6 sm:py-12 px-10 flex flex-col gap-6">
            <PlanesBackground />

            <ValuedFields
              field={'رقم الطلب'}
              value={aidRequest.id.toString()}
            />

            <ValuedFields
              field={'الاسم'}
              value={
                aidRequest.firstName && aidRequest.firstName != ''
                  ? aidRequest.firstName
                  : 'مجهول'
              }
            />

            <ValuedFields field={'التاريخ'} value={aidRequest.dateAdded} />

            <ValuedFields field={'نوع الطلب'} value={aidRequest.category} />
            <ValuedFields
              field={'العنوان'}
              value={
                aidRequest.address && aidRequest.address != ''
                  ? aidRequest.address
                  : 'مجهول'
              }
            />
            <ValuedFields
              field={'عدد الأفراد'}
              value={aidRequest.familyMembers.toString()}
            />
            <ValuedFields field={'وصف الطلب'} value={aidRequest.description} />

            <button
              className="w-full flex justify-center pt-2"
              onClick={handleComplete}
              disabled={isLoading}>
              <Button type="call" title="الاتصال الآن" />
            </button>
            {error ? <div className="text-red-500">{error}</div> : undefined}
          </div>
        </div>
      </div>
    </>
  );
};

export default Request;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const requestID = params!.id as string;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000,
        cacheTime: 60000
      }
    }
  });

  await queryClient.prefetchQuery(['aidRequest', requestID], () =>
    getRequestByID(requestID)
  );

  return {
    props: {
      requestID,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale as string, [
        'request',
        'landing'
      ]))
    },
    revalidate: 43200
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};
