export const Input = ({
  name,
  type,
  value,
  onChange,
}: {
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="mb-4">
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        name={name}
        id={name}
        type={type}
        placeholder={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
