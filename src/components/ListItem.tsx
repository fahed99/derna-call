import { FC, MouseEventHandler } from 'react';
import Button from './Button';

interface Props {
  id: number;
  aidType: string;
  address?: string;
  membersCount: number;
  date: string;
  fullDescription: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}
const ListItem: FC<Props> = (props) => {
  const { aidType, address, membersCount, date, onClick } =
    props;

  return (
    <>
      <div
        className="mt-4 mb-8 cursor-pointer w-full flex flex-col items-center tracking-wide rounded-3xl drop-shadow-[0_6px_6px_rgba(0,0,0,0.30)] hover:drop-shadow-[0_6px_6px_rgba(0,0,0,0.55)] bg-white py-6 px-3"
        onClick={onClick}>
        <div className="flex w-full md:pl-10 text-grey-100 text-opacity-90 flex-row-reverse text-right items-center justify-between">
          <div className="w-[30%]">{aidType}</div>
          <div className="w-[30%]">{address}</div>
          <div className="w-[20%] pr-6">{membersCount}</div>
          <div className="w-[25%] pr-6 relative">
            {date}
            <div className="absolute hidden md:block -left-[100px] -top-1.5">
              <Button type="secondary" title={'المزيد'} />
            </div>
          </div>
        </div>
        <div className="md:hidden bg-primary-100 w-[100px] relative">
          <div className="absolute top-1">
            <Button type="secondary" title={'المزيد'} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListItem;
