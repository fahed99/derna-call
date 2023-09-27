import { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import close from '@images/cancel.png';
import Link from 'next/link';
import Button from './Button';
import { AidRequest } from '@customTypes/AidRequest';
import { useRouter } from 'next/router';
import CallIcon from '@icons/Call';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  requestData: AidRequest;
}

const CallPopUp: FC<Props> = (props: Props) => {
  const { isOpen, setIsOpen, requestData } = props;

  const [error, setError] = useState(null);
  const router = useRouter();

  const handleParentClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    closePopup();
    router.push('submitted');
  };

  const handleCancel = async () => {
    setError(null);

    try {
      const response = await fetch(
        `https://dernacall.ly/api/aidrequest?id=${requestData.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: 'open'
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update the status');
      }
      // router.push(`accomplished`);
    } catch (err: any) {
      setError(err.message);
    }
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
          className="fixed z-20 flex h-screen min-h-[600px] w-screen place-items-center content-center justify-center bg-glass-dark backdrop-blur-sm  sm:my-0 xl:min-h-[700px]"
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
            className="relative drop-shadow-[0_6px_6px_rgba(0,0,0,0.35)] flex flex-col gap-14 min-h-[420px] w-[95%] max-w-[550px] place-items-start rounded-xl bg-white px-2 py-8 text-white sm:px-4 md:w-[85%] xl:w-[70%]">
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
                <div className="w-full py-10 px-4 flex flex-col items-center gap-6">
                  <div className="text-2xl font-bold text-grey-100">
                    إتصل الآن
                  </div>
                  <div
                    dir="rtl"
                    className="w-full md:w-[70%] flex justify-center gap-[15%]">
                    <div className="flex flex-col items-start gap-2">
                      <p
                        className="text-primary font-semibold text-lg"
                        dir="rtl">
                        {'رقم الهاتف (1)'}
                      </p>
                      <Link
                        className="text-primary-100 underline text-md flex items-baseline gap-1"
                        href={`tel:${requestData.phoneNum1}`}>
                        {requestData.phoneNum1}
                        <CallIcon size={14} color="stroke-primary" />
                      </Link>
                    </div>
                    {requestData.phoneNum2 ? (
                      <div className="flex flex-col items-start gap-2">
                        <p
                          className="text-primary font-semibold text-lg"
                          dir="rtl">
                          {'رقم الهاتف (2)'}
                        </p>
                        <Link
                          className="text-primary-100 underline text-md flex items-baseline gap-1"
                          href={`tel:${requestData.phoneNum2}`}>
                          {requestData.phoneNum2}
                          <CallIcon size={14} color="stroke-primary" />
                        </Link>
                      </div>
                    ) : undefined}
                  </div>
                  <div className="flex flex-col text-grey-100 font-bold text-lg gap-3 pt-4 w-full items-center">
                    <div>هل تودّ إزالة الطلب من المنصة؟</div>
                    <div dir="rtl" className="w-full text-sm">
                      <p className="font-semibold">
                        {'تنويه هام: '}
                        <span className="font-light">
                          في حالة عدم استطاعتك توفير المطلوب، نرجو من حضرتك
                          الضغط على “لا” حتى لا يتم إزالة هذا الطلب من على
                          الموقع بشكل نهائي
                        </span>
                      </p>
                    </div>
                    <div
                      dir="rtl"
                      className="w-full pt-2 justify-center flex gap-5">
                      <button onClick={handleConfirm}>
                        <Button type="check" title={'نعم'} />
                      </button>
                      <button onClick={handleCancel}>
                        <Button type="check" title={'لا'} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CallPopUp;
