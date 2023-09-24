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
        className="absolute w-[50px] md:w-[100px] -top-[10%]"
      />
      <Image
        src={PaperPlane1}
        alt="Plane"
        width={130}
        height={130}
        className="absolute w-[130px] md:w-[160px] -bottom-[16%] -right-[1%]"
      />
      <Image
        src={PaperPlane2}
        alt="Plane"
        width={100}
        height={100}
        className="absolute w-[60px] md:w-[120px] -bottom-[16%]"
      />
    </div>
  );
};

export default PlanesBackground;
