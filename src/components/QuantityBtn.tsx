import React from "react";

type Props = {
  value: number;
  onChange: (newValue: number) => void;
};
const QuantityBtn: React.FC<Props> = ({ value, onChange }) => {
  const inc = () => onChange(value + 1);
  const dec = () => onChange(value > 1 ? value - 1 : 1);
  return (
    <>
      <div className="flex items-center border rounded">
        <button className="px-3 py-1 text-lg font-bold" onClick={dec}>
          -
        </button>
        <span className="font-semibold">{value}</span>
        <button className="px-3 py-1 text-lg font-bold" onClick={inc}>
          +
        </button>
      </div>
    </>
  );
};

export default QuantityBtn;
