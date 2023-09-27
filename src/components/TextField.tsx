import { FC } from 'react';

interface Props {
  maxLength: number;
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: any) => void;
  isOptional?: boolean;
}

const TextField: FC<Props> = (props) => {
  const { maxLength, label, type, name, value, onChange, isOptional } = props;

  return (
    <div>
      <div className="w-full inline-flex items-baseline flex-row-reverse gap-2 pb-1.5 text-right text-primary font-semibold sm:text-lg">
        {label}
        {isOptional ? (
          <p className="inline-flex text-grey-50 text-sm">{'(اختياري)'}</p>
        ) : undefined}
      </div>
      {name === 'description' ? (
        <textarea
          maxLength={maxLength}
          required={isOptional ? false : true}
          name={name}
          // value={value}
          onChange={onChange}
          className={`w-full rounded-lg rtl text-sm text-right h-20 focus:border-2 focus:border-primary-100 border border-grey-50
					`}
        />
      ) : (
        <>
          <input
            maxLength={maxLength}
            list={name === 'category' ? `${name}-datalist` : undefined}
            required={isOptional ? false : true}
            type={type}
            name={name}
            // value={value}
            onChange={onChange}
            className={`w-full rounded-lg rtl text-sm text-right h-10 focus:border-2 focus:border-primary-100 border border-grey-50
					}`}
          />
          {name === 'category' ? (
            <datalist id={`${name}-datalist`}>
              <option value={'سكن'} />
              <option value={'غذاء'} />
              <option value={'دواء'} />
            </datalist>
          ) : undefined}
        </>
      )}
    </div>
  );
};

export default TextField;
