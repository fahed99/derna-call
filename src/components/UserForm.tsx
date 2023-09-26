import TextField from '@components/TextField';
import Image from 'next/image';
import { useState } from 'react';
import whiteLogo from '@images/logo-white.png';
import character from '@images/character.png';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MainLogo from '@images/main-logo.png';
import GuidePopUp from '@components/GuidePopUp';

function UserForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    address: '',
    category: '',
    description: '',
    familyMembers: 1,
    phoneNum1: '',
    phoneNum2: ''
  });
  const [isPopUpOpen, setIsPopUpOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://dernacall.ly/api/aidrequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update the status');
      }
      router.push(`success`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: {
    target: { name: any; value: number | string };
  }) => {
    const { name, value } = e.target;
    if (name !== 'familyMembers') {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: Number(value) });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleComplete();
    router.push('/success');
  };

  return (
    <>
      <GuidePopUp
        isOpen={isPopUpOpen}
        setIsOpen={setIsPopUpOpen}
        type="requester"
      />

      <div className="w-full flex justify-center md:hidden">
        <Link
          href={'/'}
          className="w-[240px] md:w-[25%] lg:w-[20%] flex justify-center">
          <Image priority src={MainLogo} alt="Logo" />
        </Link>
      </div>

      <div className="w-full h-screen flex justify-center">
        <div className="hidden md:flex w-[40%] h-full bg-primary flex-col items-center py-14 gap-8">
          <Link className="w-[60%] lg:w-[50%] xl:w-[35%]" href={'/'}>
            <Image loading="eager" src={whiteLogo} alt="logo" />
          </Link>
          <Image
            src={character}
            alt="character"
            className="w-[85%] xl:w-[65%]"
          />
        </div>
        <div className="w-full sm:w-[80%] md:w-[60%] p-4 sm:p-14 xl:p-28">
          <div
            dir="rtl"
            className="w-full py-10 flex flex-col md:flex-row justify-start items-start md:items-baseline gap-4 text-3xl font-bold text-primary-100">
            <span className="order-2 md:order-none">إملئ النموذج الآتي</span>
            <p
              dir="rtl"
              onClick={() => setIsPopUpOpen(true)}
              className="text-sm text-primary underline rtl text-center cursor-pointer">
              الارشادات والتعليمات💡
            </p>
          </div>
          <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
            <div className="w-full flex flex-row-reverse gap-10">
              <div className="w-1/2">
                <TextField
                  maxLength={16}
                  isOptional
                  label="الإسم"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2">
                <TextField
                  maxLength={3}
                  label="عدد الأفراد"
                  type="number"
                  name="familyMembers"
                  value={formData.familyMembers}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <TextField
              maxLength={32}
              isOptional
              label="العنوان"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <TextField
              maxLength={16}
              label="نوع الطلب"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
            <TextField
              maxLength={255}
              label="وصف الطلب"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <div className="w-full flex flex-row-reverse gap-10">
              <div className="w-1/2">
                <TextField
                  maxLength={10}
                  label="رقم الهاتف"
                  type="number"
                  name="phoneNum1"
                  value={formData.phoneNum1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2">
                <TextField
                  maxLength={10}
                  isOptional
                  label="رقم الهاتف 2"
                  type="number"
                  name="phoneNum2"
                  value={formData.phoneNum2}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full py-4 flex justify-center">
              <button type="submit" disabled={isLoading}>
                <Button type="primary" title="تأكيد الطلب" />
              </button>
            </div>
            {error ? <div className="text-red-500">{error}</div> : undefined}
          </form>
        </div>
      </div>
    </>
  );
}

export default UserForm;
