import { FC } from "react";

interface Props {
	size: number;
	color: string;
}

const SuccessLogo: FC<Props> = (props) => {
	const { size, color } = props;

	return (
		<svg
			width={size}
			height={size}
			className={`transition-all duration-300 ${color}`}
			viewBox="0 0 81 80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M40.4816 0.476196C18.1792 0.476196 0.00537109 18.2224 0.00537109 40C0.00537109 61.7776 18.1792 79.5238 40.4816 79.5238C62.7839 79.5238 80.9577 61.7776 80.9577 40C80.9577 18.2224 62.7839 0.476196 40.4816 0.476196ZM59.8292 30.9095L36.8792 53.3195C36.3125 53.8729 35.5435 54.189 34.7339 54.189C33.9244 54.189 33.1554 53.8729 32.5887 53.3195L21.1339 42.1343C19.9601 40.9881 19.9601 39.091 21.1339 37.9448C22.3078 36.7986 24.2506 36.7986 25.4244 37.9448L34.7339 47.0352L55.5387 26.72C56.7125 25.5738 58.6554 25.5738 59.8292 26.72C61.003 27.8662 61.003 29.7238 59.8292 30.9095Z" />
			<path d="M40.4816 0.476196C18.1792 0.476196 0.00537109 18.2224 0.00537109 40C0.00537109 61.7776 18.1792 79.5238 40.4816 79.5238C62.7839 79.5238 80.9577 61.7776 80.9577 40C80.9577 18.2224 62.7839 0.476196 40.4816 0.476196ZM59.8292 30.9095L36.8792 53.3195C36.3125 53.8729 35.5435 54.189 34.7339 54.189C33.9244 54.189 33.1554 53.8729 32.5887 53.3195L21.1339 42.1343C19.9601 40.9881 19.9601 39.091 21.1339 37.9448C22.3078 36.7986 24.2506 36.7986 25.4244 37.9448L34.7339 47.0352L55.5387 26.72C56.7125 25.5738 58.6554 25.5738 59.8292 26.72C61.003 27.8662 61.003 29.7238 59.8292 30.9095Z" />
		</svg>
	);
};

export default SuccessLogo;