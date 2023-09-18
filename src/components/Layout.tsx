import { FC, ReactNode } from "react";

interface Props {
	children: ReactNode[] | ReactNode;
}

const Layout: FC<Props> = (props) => {
	const { children } = props;

	return (
		<div className="text-grey-200">
			{/* <Navbar isFixed={currentPath.includes("/gpus/") ? false : true} /> */}
			<main className="min-h-[calc(100vh-48px)] h-screen xl:min-h-[calc(100vh-64px)]">
				{children}
			</main>
		</div>
	);
};

export default Layout;
