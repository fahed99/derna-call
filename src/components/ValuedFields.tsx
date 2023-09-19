import { FC } from "react";

interface Props {
	field: string;
	value: string;
}

const ValuedFields: FC<Props> = (props) => {
	const { field, value } = props;

	return (
		<div className="flex w-full flex-row-reverse gap-4">
			<div className="text-primary w-32 text-right">{field}</div>
			<div className="text-grey-100 max-w-full text-right">{value}</div>
		</div>
	);
};

export default ValuedFields;
