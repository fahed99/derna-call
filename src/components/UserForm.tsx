import TextField from '@components/TextField';
import Image from 'next/image';
import { useState } from 'react';
import whiteLogo from '@images/logo-white.png';
import character from '@images/character.png';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import MainLogo from '@images/main-logo.png';

function UserForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    address: '',
    category: '',
    description: '',
    familyMembers: 0,
    phoneNum1: '',
    phoneNum2: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  console.log(formData);

  const [error, setError] = useState(null);

  const handleComplete = async () => {
    console.log(formData);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://dernacall.ly/api/aidrequest`, {
        method: 'POST', // Assuming PATCH method for updates
        headers: {
          'Content-Type': 'application/json'
          // ... (any other headers required, e.g. authorization)
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update the status');
      }
      // Optionally navigate to another page or show a success message
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

    // Send the form data to your API or server and save it to the database using Prisma
    // Example Prisma usage:
    // await prisma.user.create({ data: formData });

    // Reset the form after submission
    router.push('/success');
  };

  return (
    <>
      <div className="w-full flex justify-center md:hidden">
        <Link
          href={'/'}
          className="w-[240px] md:w-[25%] lg:w-[20%] flex justify-center">
          <Image priority src={MainLogo} alt="Logo" />
        </Link>
      </div>

      <div className="w-screen h-screen flex justify-center">
        <div className="hidden md:flex w-[40%] h-full bg-primary flex-col items-center py-14 gap-8">
          <Link className="w-[60%] lg:w-[50%] xl:w-[35%]" href={'/'}>
            <Image loading="eager" src={whiteLogo} alt="logo" />
          </Link>
          <Image
            src={character}
            alt="character"
            className="w-[80%] lg:w-[70%] xl:w-[55%]"
          />
        </div>
        <div className="w-full sm:w-[80%] md:w-[60%] p-4 sm:p-14 xl:p-28">
          <div className="w-full py-10 flex justify-end text-3xl font-bold text-primary-100">
            إملئ النموذج الآتي
          </div>
          <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
            <div className="w-full flex flex-row-reverse gap-10">
              <div className="w-1/2">
                <TextField
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
                  label="عدد الأفراد"
                  type="text"
                  name="familyMembers"
                  value={formData.familyMembers}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <TextField
              isOptional
              label="العنوان"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <TextField
              label="نوع الطلب"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
            <TextField
              label="وصف الطلب"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <div className="w-full flex flex-row-reverse gap-10">
              <div className="w-1/2">
                <TextField
                  label="رقم الهاتف"
                  type="text"
                  name="phoneNum1"
                  value={formData.phoneNum1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2">
                <TextField
                  isOptional
                  label="رقم الهاتف 2"
                  type="text"
                  name="phoneNum2"
                  value={formData.phoneNum2}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full py-4 flex justify-center">
              <button
                type="submit"
                onClick={handleComplete}
                disabled={isLoading}>
                <Button type="primary" title="تأكيد الطلب" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserForm;
