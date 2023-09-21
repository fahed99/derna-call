import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import PlanesBackground from '@components/PlanesBackground';
import ValuedFields from '@components/ValuedFields';
import TextField from '@components/TextField';
import Link from 'next/link';
import Image from 'next/image';
import MainLogo from '@images/main-logo.png';
import Button from '@components/Button';

type Props = {
  requestID: string;
};

const Request: NextPage<Props> = (props: Props) => {
  const { requestID } = props;
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
          <div className="font-semibold text-xl w-full shadow-lg shadow-grey-50 rounded-xl py-12 px-10 xl:px-20 flex flex-col gap-6">
            <ValuedFields field={'رقم الطلب'} value={requestID} />
            <ValuedFields field={'الاسم'} value={'فهد'} />
            <ValuedFields field={'الطلب'} value={'غذاء'} />
            <ValuedFields field={'النوع'} value={'سكن'} />
            <ValuedFields field={'التاريخ'} value={'31/01/2010'} />
            <ValuedFields field={'رقم التلفون'} value={'09134523452'} />
            <ValuedFields
              field={'وصف الطلب'}
              value={'الدعم الي يدزولنا فيه مايوصلش فينا را'}
            />
            <div className="w-full flex justify-center gap-8 items-center pt-2">
              <Link href={'/requests/1'}>
                <Button type="primary" title="تم المساعده" />
              </Link>
              <Link href={'/requests/1'}>
                <div className="text-red-700 max-w-full text-right">متمش</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Request;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const requestID = params!.id as string;

  const queryClient = new QueryClient();

  if (!requestID) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    };
  }

  // await queryClient.prefetchQuery(["settings", gpuName], () =>
  // 	fetchSettings(gpuName)
  // );

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
