import { FC, useState } from "react";
import ArrowDownIcon from "@icons/ArrowDownIcon";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
	aidType: string;
	address: string;
	membersCount: number;
	date: string;
	fullDescription: string;
}

const CollapsableList: FC<Props> = (props) => {
	const { aidType, address, membersCount, date, fullDescription } = props;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className="my-4 cursor-pointer w-full tracking-wide rounded-3xl border-2 hover:shadow-xl border-primary-100 bg-white py-5 px-3"
			onClick={() => setIsOpen(!isOpen)}
		>
			<div className="flex w-full text-grey-100 flex-row-reverse text-right items-center justify-between">
				<div className="w-[30%]">{aidType}</div>
				<div className="w-[30%]">{address}</div>
				<div className="w-[20%] pr-6">{membersCount}</div>
				<div className="w-[20%] pr-6">{date}</div>
				<div className="flex items-center gap-x-4">
					<div
						className={`transition-all ${isOpen ? "rotate-180" : "rotate-0"}`}
					>
						<ArrowDownIcon size={20} color="stroke-primary-100" />
					</div>
				</div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						animate={{ height: "auto" }}
						initial={{ height: 0 }}
						exit={{ height: 0 }}
						transition={{ type: "spring", stiffness: 350, damping: 20 }}
					>
						<motion.div
							className="pt-12 leading-relaxed text-grey-100 text-right rtl"
							animate={{ y: 0, opacity: 1 }}
							initial={{ y: 10, opacity: 0 }}
							exit={{ y: 10, opacity: 0 }}
							transition={{ type: "spring", stiffness: 400, damping: 40 }}
						>
							<div className="text-primary-100 text-lg">الوصف</div>
							{fullDescription}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CollapsableList;
