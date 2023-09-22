import Button from '@components/Button';
import Success from '@components/Success';
import Image from 'next/image';
import { NextPage } from 'next';
import Link from 'next/link';
import MainLogo from '@images/main-logo.png';
import SuccessLogo from '@icons/SuccessLogo';

const AccomplishedPage: NextPage = () => {
  return (
    <div className="h-screen text-xl w-screen flex flex-col gap-5 justify-center items-center text-grey-50">
      <Link
        href={'/'}
        className="w-[240px] md:w-[25%] lg:w-[20%] flex justify-center">
        <Image priority src={MainLogo} alt="Logo" />
      </Link>

      <div className="flex flex-col gap-12 items-center justify-center">
        <div className="flex justify-center items-center -space-x-[190px]">
          <div className="rounded-full bg-primary bg-opacity-10  w-60 h-60 "></div>
          <div className="relative pr-10 z-10">
            <SuccessLogo size={140} color={'stroke-white fill-primary'} />
          </div>
        </div>
        <div className="text-6xl text-primary font-semibold">! شكرا لك </div>
        <div className="text-2xl text-primary-100 font-semibold">
          نشكرك بالنيابة عن اخواننا واخواتنا في درنةالغالية
        </div>
        <Link href="/">
          <Button type="primary" title={'تم'}></Button>
        </Link>
      </div>
    </div>
  );
};
export default AccomplishedPage;
