import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import PaperPlane1 from '@images/paper-airplane1.png';
import PaperPlane2 from '@images/paper-airplane2.png';
import PaperPlane3 from '@images/paper-airplane3.png';

const PlanesBackground: FC = () => {
  const [height, setHeight] = useState<number>();
  useEffect(() => {
    setHeight(window.screen.height);
  }, []);
  return (
    <div className="z-10">
      <Image
        src={PaperPlane3}
        width={70}
        height={70}
        alt="Plane"
        className="absolute left-[24%] top-[32%]"
      />
      <Image
        src={PaperPlane1}
        alt="Plane"
        width={130}
        height={130}
        className="absolute right-2 sm:right-[24%] bottom-[5%]"
      />
      <Image
        src={PaperPlane2}
        alt="Plane"
        width={100}
        height={100}
        className="absolute left-2 sm:left-[20%] bottom-[5%]"
      />
    </div>
  );
};

export default PlanesBackground;
