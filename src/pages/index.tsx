import Button from '@components/Button';
import Link from 'next/link';
import Image from 'next/image';
import MainLogo from '@images/main-logo.png';

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center text-grey-50">
      <div className="w-[400px] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[25%]">
        <Image priority src={MainLogo} alt="Logo" />
      </div>
      <p className="text-xl text-grey-100 w-[75%] rtl text-center">
        نهدف إلى تسهيل عملية تقديم او الحصول علي دعم لكل اخوتنا واخواتنا في
        مدينة درنة الحبيبة
      </p>
      <Link prefetch href={'/list'} className="mt-6 cursor-pointer">
        <Button type="primary" title={'تقديم الدعم'} />
      </Link>
      <Link prefetch href={'/submit-request'} className="cursor-pointer">
        <Button type="primary" title={'طلب الدعم'} />
      </Link>
    </div>
  );
}
