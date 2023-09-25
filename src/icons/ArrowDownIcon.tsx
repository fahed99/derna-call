import { FC } from 'react';

interface Props {
  size: number;
  color: string;
}

const ArrowDownIcon: FC<Props> = (props) => {
  const { size, color } = props;

  return (
    <svg
      width={size}
      height={size}
      className={`transition-all duration-300 ${color}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none">
      <path
        d="M19.9201 8.94995L13.4001 15.47C12.6301 16.24 11.3701 16.24 10.6001 15.47L4.08008 8.94995"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowDownIcon;
