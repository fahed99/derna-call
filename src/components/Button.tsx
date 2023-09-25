import { FC } from 'react';

interface Props {
  title: string;
  type: 'primary' | 'secondary' | 'call' | 'check';
  className?: string;
  requestID?: string;
}

const Button: FC<Props> = (props) => {
  const { title, type, className } = props;

  const commonClasses = "shadow-md shadow-grey-50 rounded-3xl bg-primary flex justify-center items-center";

  let specificClasses = "";

  if (type === 'primary') {
    specificClasses = "h-[50px] w-[200px]";
  } else if (type === 'call') {
    specificClasses = "h-[50px] w-[140px]";
  } else if (type === 'check') {
    specificClasses = "h-[30px] w-[80px]";
  } else if (type === 'secondary') {
    specificClasses = "h-[35px] shadow-lg p-6 w-[100px]";
  }

  const combinedClasses = `${commonClasses} ${specificClasses} ${className || ''}`;

  return (
    <div className={combinedClasses}>
      <p className={`text-white ${type === 'primary' || type === 'secondary' ? 'text-xl' : 'text-base sm:text-lg'} font-semibold`}>
        {title}
      </p>
    </div>
  );
};

export default Button;
