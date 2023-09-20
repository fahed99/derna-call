import Button from "@components/Button";
import Success from "@components/Success";
import MainLogo from "@icons/MainLogo";
import { NextPage } from "next";
import Link from "next/link";

const SuccessPage: NextPage = () => {
	return (
		<div className="h-screen text-xl w-screen flex flex-col gap-5 justify-center items-center text-grey-50">
			<MainLogo size={240} color="" />
			<Success />
		</div>
	);
};
export default SuccessPage;
