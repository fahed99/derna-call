import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import PlanesBackground from '@components/PlanesBackground';
import ValuedFields from '@components/ValuedFields';
import Link from 'next/link';
import Image from 'next/image';
import MainLogo from '@images/main-logo.png';
import Button from '@components/Button';
import { getRequestByID } from '@hooks/getRequests'; // Import our hook function
import { AidRequest } from '@customTypes/AidRequest'; // Assuming you have this type defined
import { useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
  requestData: AidRequest;
};

const Request: NextPage<Props> = (props: Props) => {
  const { requestData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query; // Assuming you're using Next.js dynamic routes

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://dernacall.ly/api/aidrequest?id=${id}`, {
        method: 'PATCH', // Assuming PATCH method for updates
        headers: {
          'Content-Type': 'application/json',
          // ... (any other headers required, e.g. authorization)
        },
        body: JSON.stringify({
          status: 'pending'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update the status');
      }

      // Process the response if needed
      const responseData = await response.json();

      // Optionally navigate to another page or show a success message
      router.push(`/success`);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PlanesBackground />
      <div className="w-screen h-screen flex flex-col items-center gap-6">
        <Link
          href={'/'}
          className="w-[240px] md:w-[25%] lg:w-[20%] flex justify-center">
          <Image priority src={MainLogo} alt="Logo" />
        </Link>

        <div className="w-full flex justify-center text-3xl font-bold text-grey-100">
          بيانات أهلنا الغاليين علينا
        </div>
        <div className="flex h-fit w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] xxl:w-[20%] justify-center">
          <div className="font-semibold text-xl w-full shadow-lg shadow-grey-50 rounded-xl py-12 px-10 flex flex-col gap-6">
            <ValuedFields field={'رقم الطلب'} value={requestData.id.toString()} />
            
            {requestData.firstName && 
              <ValuedFields field={'الاسم'} value={requestData.firstName} />
            }
            <ValuedFields field={'التاريخ'} value={requestData.dateAdded} />

            <ValuedFields field={'نوع الطلب'} value={requestData.category} />
            {requestData.address && 
              <ValuedFields field={'العنوان'} value={requestData.address} />
            }
            <ValuedFields field={'رقم التلفون'} value={requestData.phoneNum1} />
            {requestData.phoneNum2 && 
              <ValuedFields field={'(2) رقم التلفون'} value={requestData.phoneNum1} />
            }
            <ValuedFields field={'وصف الطلب'} value={requestData.description} />
            <div className="w-full flex justify-center gap-8 items-center pt-2">
              <button onClick={handleComplete} disabled={isLoading}>
                <Button type="primary" title="تم المساعده" />
              </button>
              <Link href={'/requests'}>
                <div className="text-red-700 max-w-full text-right">متمش</div>
              </Link>
            </div>
            {/* Show error message if any */}
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Request;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const requestID = params!.id as string;
  const requestData = await getRequestByID(requestID);

  return {
    props: {
      requestData,
      ...(await serverSideTranslations(locale as string, ['request', 'landing']))
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