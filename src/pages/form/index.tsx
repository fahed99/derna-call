import { NextPage } from 'next';
import UserForm from '@components/UserForm';
import { NextSeo } from 'next-seo';

const RequestForm: NextPage = () => {
  return (
    <>
      <NextSeo
        title={`Derna Call - Form`}
        description={
          'A project to help those damaged by the floods in the great city of Derna.'
        }
      />
      <UserForm />
    </>
  );
};
export default RequestForm;

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
