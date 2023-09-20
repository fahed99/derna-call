// components/UserForm.js
import TextField from "@components/TextField";
import ShortLogo from "@icons/ShortLogo";
import Image from "next/image";
import { useState } from "react";
import whiteLogo from "@images/logo-white.png";
import character from "@images/character.png";
import Button from "@components/Button";

function UserForm() {
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		phone: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Send the form data to your API or server and save it to the database using Prisma
		// Example Prisma usage:
		// await prisma.user.create({ data: formData });

		// Reset the form after submission
		setFormData({ name: "", address: "", phone: "" });
	};

	return (
		<>
			<div className="w-full md:hidden flex justify-center">
				<ShortLogo size={200} color="" />
			</div>
			<div className="w-screen h-screen flex justify-center">
				<div className="hidden md:flex w-[40%] h-full bg-primary flex-col items-center py-14 gap-8">
					<Image
						src={whiteLogo}
						alt="logo"
						className="w-[60%] lg:w-[50%] xl:w-[35%]"
					/>
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
									value={formData.address}
									onChange={handleInputChange}
								/>
							</div>
							<div className="w-1/2">
								<TextField
									label="عدد الأفراد"
									type="text"
									name="familyMembers"
									value={formData.address}
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
							value={formData.address}
							onChange={handleInputChange}
						/>
						<TextField
							label="وصف الطلب"
							type="text"
							name="description"
							value={formData.address}
							onChange={handleInputChange}
						/>
						<div className="w-full flex flex-row-reverse gap-10">
							<div className="w-1/2">
								<TextField
									label="رقم الهاتف"
									type="text"
									name="phoneNum1"
									value={formData.address}
									onChange={handleInputChange}
								/>
							</div>
							<div className="w-1/2">
								<TextField
									isOptional
									label="رقم الهاتف 2"
									type="text"
									name="phoneNum2"
									value={formData.address}
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<div className="w-full py-4 flex justify-center">
							<button type="submit">
								<Button title="تأكيد الطلب" />
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default UserForm;
