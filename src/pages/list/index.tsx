import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { FC, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import MainLogo from "@icons/MainLogo";
import ListItem from "@components/ListItem";
import Popup from "@components/PopUp";
import Link from "next/link";

type Props = {
	requestID?: string;
};

const RequestsList: NextPage<Props> = (props: Props) => {
	const { requestID } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [popUpDataID, setPopUpDataID] = useState(1);

	const handleClick = (id: number) => {
		setPopUpDataID(id);
		setIsOpen(true);
	};
	return (
		<div className="h-screen flex items-center flex-col gap-4">
			<Link href={"/"} className="w-full flex justify-center">
				<MainLogo size={230} color="" />
			</Link>
			<Popup isOpen={isOpen} setIsOpen={setIsOpen} requestID={popUpDataID} />

			<div className="w-[85%] flex flex-col gap-0.5 md:w-[55%]">
				<div className="flex font-semibold tracking-wide text-primary-100 text-lg justify-start text-right items-end flex-row-reverse rtl">
					<div className="w-[30%]">نوع الطلب</div>
					<div className="w-[30%]">العنوان</div>
					<div className="w-[20%]">عدد الأفراد</div>
					<div className="w-[20%]">تاريخ الطلب</div>
				</div>
				<ListItem
					onClick={() => handleClick(1)}
					aidType="سكن"
					address="بنغازي, ليبيا"
					membersCount={5}
					date="قبل ساعة"
					fullDescription="انا نازح عند واحد ولزني اليوم من الحوش وماعنديش وين نمشي ياريت توفرولي مكان"
				/>
				<ListItem
					onClick={() => handleClick(2)}
					aidType="سكن"
					address="بنغازي, ليبيا"
					membersCount={5}
					date="قبل ساعتين"
					fullDescription=""
				/>
				<ListItem
					onClick={() => handleClick(3)}
					aidType="سكن"
					address="بنغازي, ليبيا"
					membersCount={5}
					date="قبل 3 ساعات"
					fullDescription=""
				/>
			</div>
		</div>
	);
};
export default RequestsList;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	// const requestID = params!.id as string;

	const queryClient = new QueryClient();

	// if (!requestID) {
	// 	return {
	// 		redirect: {
	// 			destination: "/404",
	// 			permanent: false,
	// 		},
	// 	};
	// }

	return {
		props: {
			// requestID,
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 43200,
	};
};
