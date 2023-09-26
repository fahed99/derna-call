import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import Image from 'next/image';
import backArrow from '@images/back.png';

interface Props {
  children: ReactNode[] | ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { children } = props;
  const router = useRouter();
  console.log(router.asPath);

  return (
    <div className="text-grey-100 flex relative overflow-x-hidden w-full justify-center">
      {router.asPath !== '/' ? (
        <div className="absolute top-0 left-0 p-3">
          <Image
            className="cursor-pointer bg-white rounded-full"
            onClick={() => router.back()}
            height={32}
            width={32}
            src={backArrow}
            alt="close"
          />
        </div>
      ) : undefined}

      <main className="min-h-[calc(100vh-48px)] w-full flex flex-col items-center xl:min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
