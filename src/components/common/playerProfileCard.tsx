import React from "react";
import { Card } from "antd";

const { Meta } = Card;

import type { PlayerProfileCardProps } from "../../types/interfaces";

const PlayerProfileCard: React.FC<PlayerProfileCardProps> = ({
  imageUrl,
  title,
  bidWinningRate,
}) => (
  <Card
    hoverable
    style={{ width: 300 }}
    cover={<img alt="player" src={imageUrl} />}
  >
    <Meta
      title={title}
      description={`Bid Winning Ammount : ${bidWinningRate}`}
    />
  </Card>
);

export default PlayerProfileCard;
