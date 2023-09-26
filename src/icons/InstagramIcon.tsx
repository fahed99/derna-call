import { FC } from 'react';

interface Props {
  size: number;
  color: string;
}

const InstagramIcon: FC<Props> = (props) => {
  const { size, color } = props;

  return (
    <svg
      width={size}
      height={size}
      className={color}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.75 27H18.25C24.5 27 27 24.5 27 18.25V10.75C27 4.5 24.5 2 18.25 2H10.75C4.5 2 2 4.5 2 10.75V18.25C2 24.5 4.5 27 10.75 27Z"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 18.875C16.9162 18.875 18.875 16.9162 18.875 14.5C18.875 12.0838 16.9162 10.125 14.5 10.125C12.0838 10.125 10.125 12.0838 10.125 14.5C10.125 16.9162 12.0838 18.875 14.5 18.875Z"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5452 8.25H21.5595"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default InstagramIcon;
