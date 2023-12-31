import { FC } from "react";

interface Props {
	size: number;
	color: string;
}

const CloseIcon: FC<Props> = (props) => {
	const { size, color } = props;

	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 21 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
		>
			<rect width="21" height="21" fill="url(#pattern0)" />
			<defs>
				<pattern
					id="pattern0"
					patternContentUnits="objectBoundingBox"
					width="1"
					height="1"
				>
					<use xlinkHref="#image0_28_792" transform="scale(0.01)" />
				</pattern>
				<image
					id="image0_28_792"
					width="100"
					height="100"
					xlinkHref="data:image/png;base64,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"
				/>
			</defs>
		</svg>
	);
};

export default CloseIcon;
