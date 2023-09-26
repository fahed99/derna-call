import {
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import close from '@images/cancel.png';
import Link from 'next/link';
import Button from './Button';
import { AidRequest } from '@customTypes/AidRequest';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  requestData?: AidRequest;
}

const Popup: FC<Props> = (props: Props) => {
  const { isOpen, setIsOpen, requestData } = props;
  let backgroundColor;
  let borderColor;
  let textColor;
  let textString;
  if (requestData) {
    if (requestData.status === 'open') {
      backgroundColor = 'bg-open';
      borderColor = 'border-open';
      textColor = 'text-open-text';
      textString = 'متاح';
    } else if (requestData.status === 'pending') {
      backgroundColor = 'bg-pending';
      borderColor = 'border-pending';
      textColor = 'text-pending-text';
      textString = 'قيد التنفيذ';
    } else {
      backgroundColor = 'bg-resolved';
      borderColor = 'border-resolved';
      textColor = 'text-resolved';
      textString = 'تم الحل';
    }
  }

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
            type: 'spring',
            stiffness: 300,
            damping: 22,
            mass: 1
          }}
          className="fixed z-10 flex h-screen min-h-[600px] w-screen place-items-center content-center justify-center bg-glass-dark backdrop-blur-sm  sm:my-0 xl:min-h-[700px]"
          onClick={handleParentClick}>
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 22,
              mass: 1,
              duration: 50
            }}
            className="relative drop-shadow-[0_6px_6px_rgba(0,0,0,0.35)] flex flex-col gap-14 min-h-[420px] max-h-screen w-[95%] max-w-[900px] place-items-start rounded-xl bg-white px-2 py-8 text-white sm:px-4 md:w-[85%] xl:w-[70%]">
            <div className="absolute top-0 left-0 p-3">
              <Image
                className="cursor-pointer"
                onClick={closePopup}
                height={32}
                width={32}
                src={close}
                alt="close"
              />
            </div>
            {requestData && (
              <>
                <div
                  dir="rtl"
                  className="w-full px-6 sm:px-10 flex justify-start items-baseline gap-2">
                  {' '}
                  <div className="text-right text-grey-50 text-sm font-semibold">
                    #{requestData.id}
                  </div>
                  <div className="flex justify-start">
                    <div
                      className={`rounded-lg shadow-none font-semibold ${backgroundColor} ${textColor} w-fit py-1 px-2`}>
                      {textString}
                    </div>
                  </div>
                </div>
                <div className="h-fit w-full px-6 sm:px-10 pt-10 grid grid-cols-2 gap-y-14 sm:grid-cols-3 md:grid-cols-4 text-right gap-[12%]">
                  <div className="w-fit flex flex-col gap-2">
                    <div className="font-semibold text-grey-100 text-lg">
                      نوع الطلب
                    </div>
                    <div className="font-medium text-grey-100 text-md pr-1">
                      {requestData.category}
                    </div>
                  </div>
                  <div className="w-fit flex flex-col gap-2">
                    <div className="font-semibold text-grey-100 text-lg">
                      التاريخ
                    </div>
                    <div className="font-medium text-grey-100 text-md pr-1">
                      {requestData.dateAdded}
                    </div>
                  </div>
                  <div className="w-fit flex flex-col gap-2">
                    <div className="font-semibold text-grey-100 text-lg">
                      العنوان
                    </div>
                    <div className="font-medium text-grey-100 text-md pr-1">
                      {requestData.address}
                    </div>
                  </div>
                  <div className="w-fit flex flex-col gap-2">
                    <div className="font-semibold text-grey-100 text-lg">
                      عدد الأفراد
                    </div>
                    <div className="font-semibold text-grey-100 text-lg">
                      {requestData.familyMembers}
                    </div>
                  </div>
                </div>
                <div className="w-full flex text-right flex-col items-start gap-2 px-6 sm:px-10">
                  <div className="font-semibold text-grey-100 text-lg">
                    وصف الطلب
                  </div>
                  <div className="font-medium text-grey-100 text-md pr-1">
                    {requestData.description}
                  </div>
                </div>
                <div className="pt-6 w-full flex justify-center">
                  {requestData.status === 'pending' ? (
                    <Button
                      type="primary"
                      title="تقديم الدعم"
                      className="cursor-not-allowed opacity-40"
                    />
                  ) : (
                    <Link href={'/requests/' + requestData.id}>
                      <Button type="primary" title="تقديم الدعم" />
                    </Link>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
