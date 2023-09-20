import {
	Dispatch,
	FC,
	MouseEvent,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import close from "@images/cancel.png";

interface Props {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	requestID: number;
}

const Popup: FC<Props> = (props: Props) => {
	const { isOpen, setIsOpen, requestID } = props;

	const handleParentClick = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closePopup();
		}
	};

	const closePopup = () => {
		setIsOpen(false);
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					animate={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					exit={{ opacity: 0 }}
					transition={{
						type: "spring",
						stiffness: 300,
						damping: 22,
						mass: 1,
					}}
					className="fixed z-10 -my-12 flex h-screen min-h-[400px] w-screen place-items-center content-center justify-center bg-glass-dark backdrop-blur-sm  sm:my-0 xl:min-h-[700px]"
					onClick={handleParentClick}
				>
					<motion.div
						animate={{ opacity: 1, scale: 1 }}
						initial={{ opacity: 0, scale: 0 }}
						exit={{ opacity: 0, scale: 0 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 22,
							mass: 1,
							duration: 50,
						}}
						className="relative drop-shadow-[0_6px_6px_rgba(0,0,0,0.35)] grid min-h-[420px] w-[95%] max-w-[900px] place-items-center rounded-xl bg-white px-2 py-8 text-white sm:px-4 md:w-[85%] xl:w-[70%]"
					>
						<div className="absolute top-0 left-0 p-4">
							<Image
								className="cursor-pointer"
								onClick={closePopup}
								height={32}
								width={32}
								src={close}
								alt="close"
							/>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Popup;
