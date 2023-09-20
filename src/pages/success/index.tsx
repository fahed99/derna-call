import Button from "@components/Button";
import SuccessPage from "@components/SuccessPage";
import MainLogo from "@icons/MainLogo";
import Link from "next/link";

export default function Home() {
	return (
		<div className="h-screen text-xl w-screen flex flex-col gap-5 justify-center items-center text-grey-50">
			
			
            <MainLogo size={220} color="" />

                <SuccessPage/>
		</div>
	);
}
