import { FC } from 'react';

interface Props {
  title: string;
  type: 'primary' | 'secondary';
}

const LandingCard: FC<Props> = (props) => {
  const { title, type } = props;

  return (
    <>
      {type === 'primary' ? (
        <div className="h-[55px] shadow-md shadow-grey-50 w-[200px] rounded-3xl bg-primary flex justify-center items-center">
          <p className="text-white text-xl font-semibold">{title}</p>
        </div>
      ) : (
        <div className="h-[35px] shadow-md p-6 shadow-grey-50 w-[100px] rounded-xl bg-primary flex justify-center items-center">
          <p className="text-white text-md font-semibold">{title}</p>
        </div>
      )}
    </>
  );
};

export default LandingCard;
