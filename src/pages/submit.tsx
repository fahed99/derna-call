import { GetStaticProps, NextPage } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import UserForm from '@components/UserForm';

const SubmitRequest: NextPage = () => {
  return <UserForm />;
};
export default SubmitRequest;

// export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
// 	// const requestID = params!.id as string;

// 	const queryClient = new QueryClient();

// 	// if (!requestID) {
// 	// 	return {
// 	// 		redirect: {
// 	// 			destination: "/404",
// 	// 			permanent: false,
// 	// 		},
// 	// 	};
// 	// }

// 	return {
// 		props: {
// 			// requestID,
// 			dehydratedState: dehydrate(queryClient),
// 		},
// 	};
// };
