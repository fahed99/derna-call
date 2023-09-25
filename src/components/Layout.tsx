import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode[] | ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className="text-grey-100 flex relative overflow-hidden w-full justify-center">
      <main className="min-h-[calc(100vh-48px)] w-full flex flex-col items-center max-w-[1260px] xl:min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
