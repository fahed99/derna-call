import { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import close from '@images/cancel.png';
import aider from '@images/aider.png';
import requester from '@images/requester.png';
import requesterGuide from '@images/requester-guide.png';
import aiderGuide from '@images/aider-guide.png';
import Button from './Button';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  type: 'both' | 'aider' | 'requester';
}

const GuidePopUp: FC<Props> = (props: Props) => {
  const { isOpen, setIsOpen, type } = props;

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
            className="relative drop-shadow-[0_6px_6px_rgba(0,0,0,0.35)] flex flex-col max-h-screen gap-2 min-h-[420px] w-[95%] max-w-[550px] place-items-start rounded-xl bg-white px-2 py-8 text-white sm:px-4 md:w-[85%] xl:w-[70%]">
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
            <div className="w-full py-10 px-4 flex flex-col sm:flex-row items-center justify-center gap-6">
              {type === 'both' ? (
                <>
                  <div className="w-[80%] max-w-[280px] sm:max-w-none flex items-center flex-col gap-3">
                    <Image
                      className="cursor-pointer w-[70%]"
                      src={aider}
                      alt="aider"
                    />
                    <p
                      dir="rtl"
                      className="text-grey-100 text-sm text-center font-semibold">
                      اذا كنت من المتضررين وتود طلب المساعده اضغط على زر
                      <span className="text-primary"> طلب دعم</span>
                    </p>
                  </div>
                  <div className="w-[80%] max-w-[280px] sm:max-w-none flex items-center flex-col gap-3">
                    <Image
                      className="cursor-pointer w-[70%]"
                      src={requester}
                      alt="requester"
                    />
                    <p
                      dir="rtl"
                      className="text-grey-100 text-sm text-center font-semibold">
                      اذا كنت تود تقديم المساعده اضغط على زر
                      <span className="text-primary"> تقديم دعم</span>
                    </p>
                  </div>
                </>
              ) : type === 'requester' ? (
                <>
                  <div className="w-[90%] max-w-[280px] sm:max-w-none flex items-center flex-col gap-3">
                    <Image
                      className="cursor-pointer w-[60%]"
                      src={requesterGuide}
                      alt="aider"
                    />
                    <ol
                      dir="rtl"
                      className="text-primary-100 text-sm text-right font-semibold list-decimal">
                      <li>
                        إملئ النموذج علما بأن بعض الخانات يمكن تركها بدون بيانات
                        <span className="text-primary">{' (اختيارية)'}</span>
                      </li>
                      <li>
                        اضغط على
                        <span className="text-primary">{' تقديم الطلب'}</span>
                      </li>
                      <li>سيتم العمل على تلبية طلبك في أقرب فرصة من اخوانك</li>
                    </ol>
                  </div>
                </>
              ) : type === 'aider' ? (
                <>
                  <div className="w-[90%] max-w-[280px] sm:max-w-none flex items-center flex-col gap-3">
                    <Image
                      className="cursor-pointer w-[60%]"
                      src={aiderGuide}
                      alt="aider"
                    />
                    <ol
                      dir="rtl"
                      className="text-primary-100 text-sm text-right font-semibold list-decimal">
                      <li>تصفح الطلبات المتاحة في قائمة الطلبات</li>
                      <li>اختار طلب تستطيع تنفيذه و التكفل به من القائمة </li>
                      <li>
                        اضغط على زر
                        <span className="text-primary">{' الاتصال الان '}</span>
                        و قم بمساعدة اهلنا
                      </li>
                    </ol>
                  </div>
                </>
              ) : undefined}
            </div>
            <button onClick={closePopup} className="w-full flex justify-center">
              <Button type="primary" title="المتابعة" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GuidePopUp;
