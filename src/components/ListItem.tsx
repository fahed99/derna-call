import { FC, MouseEventHandler } from 'react';
import Button from './Button';
import Image from 'next/image';
import Medicine from '@images/medicine.png';
import Food from '@images/food.png';
import Housing from '@images/housing.png';
import Other from '@images/other.png';

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
  const { id, aidType, address, membersCount, date, onClick } = props;

  return (
    <>
      <div
        className="w-[330px] cursor-pointer h-[270px] md:col-span-auto flex items-center flex-col px-4 py-3 border border-open shadow-md hover:shadow-lg hover:shadow-grey-50 shadow-grey-50 rounded-lg"
        onClick={onClick}>
        <div className="flex w-full">
          <div className="text-right text-grey-50 text-sm font-semibold w-1/2">
            #{id}
          </div>
          <div className="w-1/2 flex justify-end">
            <div className="rounded-lg shadow-none text-grey-50 font-semibold bg-open w-fit py-1 px-2">
              مفتوح
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="md:w-[65%] flex gap-[25%]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col text-right gap-0.5">
                <div className="text-md font-semibold text-grey-100">
                  التاريخ
                </div>
                <div className="text-sm font-regular text-grey-100">{date}</div>
              </div>
              <div className="flex flex-col text-right gap-0.5">
                <div className="text-md font-semibold text-grey-100">
                  عدد الأفراد
                </div>
                <div className="text-sm font-regular text-grey-100">
                  {membersCount}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col text-right gap-0.5">
                <div className="text-md font-semibold text-grey-100">
                  نوع الطلب
                </div>
                <div className="text-sm font-regular text-grey-100">
                  {aidType}
                </div>
              </div>
              <div className="flex flex-col text-right gap-0.5">
                <div className="text-md font-semibold text-grey-100">
                  العنوان
                </div>
                <div className="text-sm font-regular text-grey-100">
                  {address}
                </div>
              </div>
            </div>
          </div>
          <div className="items-left w-[40%] md:w-[35%] py-8">
            <Image
              src={
                aidType === 'دواء'
                  ? Medicine
                  : aidType === 'غذاء'
                  ? Food
                  : aidType === 'سكن'
                  ? Housing
                  : Other
              }
              alt={aidType}
            />
          </div>
        </div>
        <div className="relative w-[100px]">
          <div className="absolute top-3 md:top-8">
            <Button type="secondary" title="المزيد" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListItem;
