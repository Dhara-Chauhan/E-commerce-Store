import React from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";

type Props = {
  rating: number;
  max?: number;
};

const RatingStars: React.FC<Props> = ({ rating, max = 5 }) => {
  return (
    <>
      <p className="text-gray-700 mb-6">
        Rating:
        <span className="font-semibold flex items-center">
          {Array.from({ length: max }, (_, i) =>
            i < Math.round(rating) ? (
              <StarFilled
                style={{ color: "#DE7921" }}
                key={i}
                className="text-yellow-500 text-lg"
              />
            ) : (
              <StarOutlined key={i} className="text-gray-400 text-lg" />
            )
          )}
          <span className="ml-1 font-normal text-xs items-center">
            {rating}
          </span>
        </span>
      </p>
    </>
  );
};

export default RatingStars;
