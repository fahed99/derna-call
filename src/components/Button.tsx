import { FC } from 'react';

interface Props {
  title: string;
  type: 'primary' | 'secondary' | 'call' | 'check' | 'open-request' | 'pending-request' | 'resolved-request' | any;
  className?: string;
  requestID?: string;
}

const Button: FC<Props> = (props) => {
  const { title, type, className } = props;

  const commonClasses =
    'shadow-md shadow-grey-50 flex justify-center items-center';

  let specificClasses = '';

  if (type === 'primary') {
    specificClasses = 'h-[50px] w-[200px] rounded-3xl bg-primary text-white text-lg';
  } else if (type === 'call') {
    specificClasses = 'h-[50px] w-[140px] rounded-3xl bg-primary';
  } else if (type === 'check') {
    specificClasses = 'h-[30px] w-[80px] rounded-3xl bg-primary';
  } else if (type === 'secondary') {
    specificClasses = 'h-[35px] shadow-lg p-6 w-[100px] rounded-3xl bg-primary text-base sm:text-lg';
  } else if (type === 'open-request') {
    specificClasses = 'h-[35px] shadow-lg p-6 w-[100px] rounded-xl bg-primary border-open text-white';
  } else if (type === 'pending-request') {
    specificClasses = 'h-[35px] shadow-lg p-6 w-[100px] rounded-xl bg-grey-50 border-2 border-pending text-grey-700';
  } else if (type === 'resolved-request') {
    specificClasses = 'h-[35px] shadow-lg p-6 w-[100px] rounded-xl bg-grey-50 border-2 border-resolved text-grey-700';

  }

  const combinedClasses = `${commonClasses} ${specificClasses} ${
    className || ''
  }`;

  return (
    <div className={combinedClasses}>
      <p
        className={`font-semibold`}>
        {title}
      </p>
    </div>
  );
};

export default Button;
