import { FC } from 'react';

interface Props {
  field: string;
  value: string;
}

const ValuedFields: FC<Props> = (props) => {
  const { field, value } = props;

  return (
    <div className="flex w-full text-sm sm:text-lg flex-row-reverse gap-4">
      <div className="text-primary w-fit text-right">{field}</div>
      <div className="text-grey-100 max-w-full text-right">{value}</div>
    </div>
  );
};

export default ValuedFields;
