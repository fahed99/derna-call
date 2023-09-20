import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import PlanesBackground from "@components/PlanesBackground";
import ShortLogo from "@icons/ShortLogo";
import ValuedFields from "@components/ValuedFields";
import TextField from "@components/TextField";
import Link from "next/link";

type Props = {
	requestID: string;
};

const Request: NextPage<Props> = (props: Props) => {
	const { requestID } = props;
	return (
		<>
			<PlanesBackground />
			<div className="w-screen h-screen flex flex-col items-center gap-6">
				<Link href={"/"} className="w-full flex justify-center">
					<ShortLogo size={200} color="" />
				</Link>
				<div className="w-full flex justify-center text-3xl font-bold text-grey-100">
					بيانات أهلنا الغاليين علينا
				</div>
				<div className="flex w-[45%] justify-center">
					<div className="h-[530px] font-semibold text-xl w-full shadow-lg shadow-grey-50 rounded-xl py-20 px-14 flex flex-col gap-6">
						<ValuedFields field={"رقم الطلب"} value={requestID} />
						<ValuedFields field={"الاسم"} value={"فهد"} />
						<ValuedFields field={"الطلب"} value={"غذاء"} />
						<ValuedFields
							field={"وصف الطلب"}
							value={"الدعم الي يدزولنا فيه مايوصلش فينا را"}
						/>
						<ValuedFields field={"النوع"} value={"سكن"} />
						<ValuedFields field={"التاريخ"} value={"31/01/2010"} />
						<ValuedFields field={"رقم التلفون"} value={"09134523452"} />
					</div>
				</div>
			</div>
		</>
	);
};
export default Request;

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	const requestID = params!.id as string;

	const queryClient = new QueryClient();

	if (!requestID) {
		return {
			redirect: {
				destination: "/404",
				permanent: false,
			},
		};
	}

	// await queryClient.prefetchQuery(["settings", gpuName], () =>
	// 	fetchSettings(gpuName)
	// );

	return {
		props: {
			requestID,
			dehydratedState: dehydrate(queryClient),
			...(await serverSideTranslations(locale as string, [
				"request",
				"landing",
			])),
		},
		revalidate: 43200,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: "blocking",
	};
};
