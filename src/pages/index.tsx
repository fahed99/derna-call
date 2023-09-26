import Button from '@components/Button';
import Link from 'next/link';
import Image from 'next/image';
import MainLogo from '@images/main-logo.png';
import BlueEllipse from '@components/BlueEllipse';
import FacebookIcon from '@icons/FacebookIcon';
import InstagramIcon from '@icons/InstagramIcon';
import { useState } from 'react';
import GuidePopUp from '@components/GuidePopUp';

export default function Home() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  return (
    <>
      <GuidePopUp isOpen={isPopUpOpen} setIsOpen={setIsPopUpOpen} type="both" />
      <div className="h-screen min-h-[900px] flex flex-col gap-5 justify-center items-center text-grey-50">
        <BlueEllipse />
        <div
          className={`w-[400px]
        m:w-[70%] md:w-[50%] lg:w-[40%]`}>
          <Image priority src={MainLogo} alt="Logo" />
        </div>
        <p
          dir="rtl"
          className="text-base w-[80%] text-primary-100 rtl text-center">
          نهدف إلى توفير بيئة آمنة وموثوقة تجمع بين الأفراد الذين يحتاجون إلى
          المساعدة والأشخاص الذين يرغبون في تقديم المساعدة
        </p>
        <p
          dir="rtl"
          onClick={() => setIsPopUpOpen(true)}
          className="text-sm w-[80%] text-primary underline rtl text-center cursor-pointer">
          الارشادات والتعليمات💡
        </p>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center justify-center gap-8">
            <Link prefetch href={'/requests'} className="cursor-pointer">
              <Button
                className="max-w-[140px] text-sm"
                type="primary"
                title={'تقديم الدعم'}
              />
            </Link>
            <Link prefetch href={'/submit'} className="cursor-pointer">
              <Button
                className="max-w-[140px] text-sm"
                type="primary"
                title={'طلب الدعم'}
              />
            </Link>
          </div>
          <a
            href="https://estejaba.ly/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit gap-1 items-center flex flex-row-reverse rounded-3xl h-[55px] border-opacity-60 text-sm text-primary font-semibold border px-10 py-2 border-primary cursor-pointer">
            تبحث عن أرقام الجهات المختصة؟ انقر هنا
          </a>
          <div className="w-full pt-1 flex flex-col gap-2">
            <div className="w-full flex text-[11px] justify-center font-bold text-primary-100 text-opacity-80">
              للتواصل معنا
            </div>
            <div className="w-full flex justify-center gap-2">
              <a
                href={'https://www.facebook.com/61551726666502/'}
                target="_blank"
                rel="noopener noreferrer">
                <FacebookIcon
                  size={24}
                  color="fill-primary-100 stroke-primary-100"
                />
              </a>
              <a
                href={'https://www.instagram.com/dernacall/'}
                target="_blank"
                rel="noopener noreferrer">
                <InstagramIcon size={24} color="stroke-primary-100" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
