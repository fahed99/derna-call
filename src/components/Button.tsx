import { FC } from "react";

interface Props {
	title: string;
}

const LandingCard: FC<Props> = (props) => {
	const { title } = props;

	return (
		<div className="h-[55px] w-[200px] rounded-3xl bg-primary flex justify-center items-center">
			<p className="text-white text-xl font-semibold">{title}</p>
		</div>
	);
};

export default LandingCard;
