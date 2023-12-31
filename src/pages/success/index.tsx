import Success from '@components/Success';
import Image from 'next/image';
import { NextPage } from 'next';
import Link from 'next/link';
import MainLogo from '@images/main-logo.png';
import { NextSeo } from 'next-seo';

const SuccessPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title={`Derna Call - Success`}
        description={
          'A project to help those damaged by the floods in the great city of Derna.'
        }
      />
      <div className="h-screen text-xl w-screen flex flex-col gap-5 justify-center items-center text-grey-50">
        <Link
          href={'/'}
          className="w-[240px] md:w-[25%] lg:w-[20%] flex justify-center">
          <Image priority src={MainLogo} alt="Logo" />
        </Link>

        <Success />
      </div>
    </>
  );
};
export default SuccessPage;
