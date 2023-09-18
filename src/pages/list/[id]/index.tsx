import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { FC } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { QueryClient, dehydrate } from "@tanstack/react-query";

type Props = {
	requestID: string;
};

const Request: NextPage<Props> = (props: Props) => {
	const { requestID } = props;
	return <div className="bg-primary">{requestID}</div>;
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
