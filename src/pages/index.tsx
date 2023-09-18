import Button from "@components/Button";
import MainLogo from "@icons/MainLogo";
import Image from "next/image";

export default function Home() {
	return (
		<div className="h-screen text-xl w-screen flex flex-col gap-5 justify-center items-center text-grey-50">
			<div className="">
				<MainLogo size={400} color="" />
			</div>
			<p className="text-grey-100">
				نهدف إلى تسهيل عملية تقديم او الحصول علي دعم لكل اخوتنا واخواتنا في
				مدينة درنة الحبيبة
			</p>
			<div className="mt-6 cursor-pointer">
				<Button title={"تقديم الدعم"} />
			</div>
			<div className="cursor-pointer">
				<Button title={"طلب الدعم"} />
			</div>
		</div>
	);
}
