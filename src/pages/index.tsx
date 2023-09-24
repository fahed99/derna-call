import Button from '@components/Button';
import Link from 'next/link';
import Image from 'next/image';
import MainLogo from '@images/main-logo.png';
import BlueEllipse from '@components/BlueEllipse';
import { useEffect, useState } from 'react';

export default function Home() {
  return (
    <div className="h-screen min-h-[900px] overflow-y-scroll flex flex-col gap-5 justify-center items-center text-grey-50">
      <BlueEllipse />
      <div
        className={`w-[400px]
        m:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[25%]`}>
        <Image priority src={MainLogo} alt="Logo" />
      </div>
      <p className="text-xl w-[75%] text-primary rtl text-center">
        نهدف إلى توفير بيئة آمنة وموثوقة تجمع بين الأفراد الذين يحتاجون إلى
        المساعدة والأشخاص الذين يرغبون في تقديم المساعدة{' '}
      </p>
      <div className="flex flex-col gap-12 mt-10">
        <div className="flex flex-col items-center justify-center gap-5">
          <Link prefetch href={'/requests'} className="cursor-pointer">
            <Button type="primary" title={'تقديم الدعم'} />
          </Link>
          <Link prefetch href={'/submit'} className="cursor-pointer">
            <Button type="primary" title={'طلب الدعم'} />
          </Link>
        </div>
        <Link prefetch={false} href={''} className="cursor-pointer py-4">
          <button className="w-fit gap-1 items-center flex flex-row-reverse rounded-3xl h-[55px] border-opacity-60 text-sm text-primary font-semibold border px-10 py-2 border-primary">
            <div>تبحث عن أرقام الجهات المختصة؟</div>
            <div>انقر هنا</div>
          </button>
        </Link>
      </div>
    </div>
  );
}
