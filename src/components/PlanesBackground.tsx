import Image from "next/image";
import { FC } from "react";
import PaperPlane1 from "@images/paper-airplane1.png";
import PaperPlane2 from "@images/paper-airplane2.png";
import PaperPlane3 from "@images/paper-airplane3.png";

const PlanesBackground: FC = () => {
  return (
    <div className="z-10">
      <Image
        src={PaperPlane3}
        width={130}
        height={130}
        alt="Plane"
        className="absolute left-[23%] top-[30%]"
      />
      <Image
        src={PaperPlane1}
        alt="Plane"
        width={220}
        height={220}
        className="absolute right-[24%] bottom-[12%]"
      />
      <Image
        src={PaperPlane2}
        alt="Plane"
        width={170}
        height={170}
        className="absolute left-[20%] bottom-[15%]"
      />
    </div>
  );
};

export default PlanesBackground;
