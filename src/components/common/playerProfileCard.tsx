import React from "react";
import { Card } from "antd";
import type { PlayerProfileCardProps } from "../../types/interfaces";

const { Meta } = Card;

const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({
  imageUrl,
  title,
  bidWinningRate,
}) => (
  <Card
    hoverable
    className="rounded-xl shadow-md hover:shadow-xl transition duration-200"
    cover={
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-xl">
        {imageUrl ? (
          <img
            alt={title}
            src={imageUrl}
            className="max-h-64 w-full object-contain"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </div>
    }
  >
    <Meta
      title={<span className="font-semibold text-gray-800">{title}</span>}
      description={
        <span className="text-sm text-gray-600">
          Bid Winning Amount:{" "}
          <span className="font-medium text-black">{bidWinningRate ?? 0}</span>
        </span>
      }
    />
  </Card>
);

export default PlayerProfileCard;
