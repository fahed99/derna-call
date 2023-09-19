import { FC, ReactNode, useState } from "react";

interface Props {
	title: string;
}

const TextField: FC<Props> = (props) => {
	const { title } = props;
	const [isFocused, setIsFocused] = useState(false);

	return (
		<input
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			type="text"
			className={`w-full rounded-lg rtl text-right h-8 ${
				isFocused ? "border-2 border-primary-100" : "border border-grey-50"
			}`}
		></input>
	);
};

export default TextField;
