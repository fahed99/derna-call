import { FC, MouseEventHandler } from 'react';
import Button from './Button';
import Image from 'next/image';
import Medicine from '@images/medicine.png';
import Food from '@images/food.png';
import Housing from '@images/housing.png';
import Furniture from '@images/furniture.png';
import Appliance from '@images/appliance.png';
import Clothing from '@images/clothing.png';
import Other from '@images/other.png';

interface Props {
  id: number;
  aidType: string;
  address?: string;
  membersCount: number;
  status: string;
  date: string;
  fullDescription: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}
const ListItem: FC<Props> = (props) => {
  const { id, aidType, status, address, membersCount, date, onClick } = props;
  let backgroundColor;
  let borderColor;
  let textColor;
  let textString;
  let buttonType;
  if (status === 'open') {
    backgroundColor = 'bg-open';
    borderColor = 'border-open';
    textColor = 'text-open-text';
    textString = 'متاح';
    buttonType = 'open-request';
  } else if (status === 'pending') {
    backgroundColor = 'bg-pending';
    borderColor = 'border-pending';
    textColor = 'text-pending-text';
    textString = 'قيد التنفيذ';
    buttonType = 'pending-request';
  } else {
    backgroundColor = 'bg-resolved';
    borderColor = 'border-resolved';
    textColor = 'text-resolved-text';
    textString = 'مغلقة';
    buttonType = 'resolved-request';
  }

  const foodKeywords = ['أكل', 'غذاء', 'اغاثة', 'مؤونة'];
  const medicineKeywords = ['دواء', 'علاج', 'طبي'];
  const housingKeywords = ['سكن', 'مسكن', 'منزل'];
  const furnitureKeywords = ['أثاث', 'كماليات'];
  const applianceKeywords = [
    'أجهزة',
    'كهربائية',
    'كهرومنزلية',
    'ثلاجة',
    'تلاجة'
  ];
  const clothingKeywords = ['ملابس', 'دبش', 'كويش', 'ملبس'];

  const getAidCategory = () => {
    if (isStringContainsKeyword(foodKeywords)) {
      return Food;
    } else if (isStringContainsKeyword(medicineKeywords)) {
      return Medicine;
    } else if (isStringContainsKeyword(furnitureKeywords)) {
      return Furniture;
    } else if (isStringContainsKeyword(applianceKeywords)) {
      return Appliance;
    } else if (isStringContainsKeyword(clothingKeywords)) {
      return Clothing;
    } else if (isStringContainsKeyword(housingKeywords)) {
      return Housing;
    } else {
      return Other;
    }
  };

  const isStringContainsKeyword = (keywords: Array<string>) =>
    keywords.some((keyword) => {
      const regex = new RegExp(keyword, 'i');
      return regex.test(aidType);
    });

  return (
    <>
      <div
        className={`w-[330px] cursor-pointer h-[250px] md:col-span-auto flex items-center flex-col pr-4 py-3 border ${borderColor} shadow-md hover:shadow-lg hover:shadow-grey-50 shadow-grey-50 rounded-lg`}
        onClick={onClick}>
        <div className="flex w-full pl-4">
          <div className="text-right text-grey-50 text-sm font-semibold w-1/2">
            #{id}
          </div>
          <div className="w-1/2 flex justify-end">
            <div
              className={`rounded-lg shadow-none font-semibold ${backgroundColor} ${textColor} w-fit py-1 px-2`}>
              {textString}
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="md:w-[65%] w-[60%] flex gap-[25%]">
            <div className="flex flex-col gap-10">
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
            <div className="flex flex-col gap-10">
              <div className="flex flex-col text-right gap-0.5">
                <div className="text-m whitespace-nowrap font-semibold text-grey-100">
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
                  {address ? address : 'مجهول'}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[40%] md:w-[35%] pl-0.5 py-8">
            <Image src={getAidCategory()} alt={aidType} />
          </div>
        </div>
        <div className="relative w-[100px]">
          <div className="absolute md:top-2 -top-1">
            <Button type={buttonType} title="المزيد" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListItem;
