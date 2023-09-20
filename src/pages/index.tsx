import Button from "@components/Button";
import MainLogo from "@icons/MainLogo";
import Link from "next/link";

export default function Home() {
	return (
		<div className="h-screen text-xl w-screen flex flex-col gap-5 justify-center items-center text-grey-50">
			<div className="">
				<MainLogo size={400} color="" />
			</div>
			<p className="text-grey-100 w-full rtl text-center">
				نهدف إلى تسهيل عملية تقديم او الحصول علي دعم لكل اخوتنا واخواتنا في
				مدينة درنة الحبيبة
			</p>
			<Link prefetch href={"/list"} className="mt-6 cursor-pointer">
				<Button type="primary" title={"تقديم الدعم"} />
			</Link>
			<Link prefetch href={"/submit-request"} className="cursor-pointer">
				<Button type="primary" title={"طلب الدعم"} />
			</Link>
		</div>
	);
}
