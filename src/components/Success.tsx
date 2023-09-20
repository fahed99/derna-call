import { FC } from "react";
import SuccessLogo from "@icons/SuccessLogo";
import Button from "./Button";
import Link from "next/link";

interface Props {}

const Success: FC<Props> = (props) => {
	const {} = props;

	return (
		<div className="flex flex-col gap-12 items-center justify-center">
			<div className="flex justify-center items-center -space-x-[190px]">
				<div className="rounded-full bg-primary bg-opacity-10  w-60 h-60 "></div>
				<div className="relative pr-10 z-10">
					<SuccessLogo size={140} color={"stroke-white fill-primary"} />
				</div>
			</div>
			<div className="text-6xl text-primary font-semibold">! شكرا لك </div>
			<div className="text-2xl text-primary-100 font-semibold">
				تم تقديم طلبك بنجاح
			</div>
			<Link href="/">
				<Button title={"تم"}></Button>
			</Link>
		</div>
	);
};

export default Success;
