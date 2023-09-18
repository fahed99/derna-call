import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { FC } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import MainLogo from "@icons/MainLogo";
import CollapsableList from "@components/CollapsableList";

type Props = {
	requestID?: string;
};

const RequestsList: NextPage<Props> = (props: Props) => {
	const { requestID } = props;
	return (
		<div className="h-screen flex items-center flex-col gap-4">
			<div className="w-full flex justify-center">
				<MainLogo size={230} color="" />
			</div>
			<div className="w-[55%]">
				<div className="flex font-semibold tracking-wide text-primary-100 text-lg justify-start text-right items-end flex-row-reverse rtl">
					<div className="w-[30%]">نوع الطلب</div>
					<div className="w-[30%]">العنوان</div>
					<div className="w-[20%]">عدد الأفراد</div>
					<div className="w-[20%]">تاريخ الطلب</div>
				</div>
				<CollapsableList
					aidType="سكن"
					address="بنغازي, ليبيا"
					membersCount={5}
					date="اليوم"
					fullDescription="انا نازح عند واحد ولزني اليوم من الحوش وماعنديش وين نمشي ياريت توفرولي مكان"
				/>
				<CollapsableList
					aidType="سكن"
					address="بنغازي, ليبيا"
					membersCount={5}
					date="اليوم"
					fullDescription=""
				/>
				<CollapsableList
					aidType="سكن"
					address="بنغازي, ليبيا"
					membersCount={5}
					date="اليوم"
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
