import { FC, ReactNode, useState } from "react";

interface Props {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  isOptional?: boolean;
}

const TextField: FC<Props> = (props) => {
  const { label, type, name, value, onChange, isOptional } = props;

  return (
    <div>
      <div className="w-full inline-flex items-baseline flex-row-reverse gap-2 pb-1.5 text-right text-primary font-semibold sm:text-lg">
        {label}
        {isOptional ? (
          <p className="inline-flex text-grey-50 text-sm">{"(اختياري)"}</p>
        ) : undefined}
      </div>
      {name === "description" ? (
        <textarea
          required={isOptional ? false : true}
          name={name}
          // value={value}
          onChange={onChange}
          className={`w-full rounded-lg rtl text-sm text-right h-20 focus:border-2 focus:border-primary-100 border border-grey-50
					}`}
        />
      ) : (
        <input
          required={isOptional ? false : true}
          type={type}
          name={name}
          // value={value}
          onChange={onChange}
          className={`w-full rounded-lg rtl text-sm text-right h-10 focus:border-2 focus:border-primary-100 border border-grey-50
					}`}
        />
      )}
    </div>
  );
};

export default TextField;
