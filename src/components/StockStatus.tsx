import React from "react";

type Props = {
  status: string | undefined;
  stock: number | undefined;
};
const StockStatus: React.FC<Props> = ({ status, stock }) => {
  let Message = "";
  if (status === "Low stock") {
    Message = `Hurry! Only ${stock} left in stock.`;
  } else if (status === "Out of Stock") {
    Message = "Currently unavailable.";
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <p
          className={` ${
            status === "In Stock" ? "bg-green-600" : "bg-yellow-600"
          } text-white rounded w-fit p-0.5 mb-3`}
        >
          {status}
        </p>
        <p>{Message}</p>
      </div>
    </>
  );
};

export default StockStatus;
