import { useParams } from "react-router-dom";
import usePlayerdetail from "../../../service/admin/player/usePlayerdetail";
import useBidLog from "../../../service/admin/bidLog/useBidLogFetch";

import DataCard from "../../common/dataCard";

import type { Player } from "../../../types/interfaces";
import { Table } from "antd";

export default function Player() {
  const { id } = useParams<{ id: string }>() || null;

  const { isLoading, data } = usePlayerdetail({ id: id || "" });
  const { data: bidLogData, isLoading: isBidLogLoading } = useBidLog({
    player: id || "",
  });
  if (isLoading || isBidLogLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-left text-black-700 tracking-wide">
        Player Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard title="Player Name">
          <p> {data.data.fullName}</p>
        </DataCard>
        <DataCard title="Email">
          <p>{data.data.email}</p>
        </DataCard>
        <DataCard title="Category">
          <p>{data.data.category}</p>
        </DataCard>
        <DataCard title="Contact Number">
          <p>{data.data.contactNumber}</p>
        </DataCard>
        <DataCard title="Playing Style">
          <p>{data.data.playingStyle}</p>
        </DataCard>
        <DataCard title="Batting Style">
          <p>{data.data.battingStyle}</p>
        </DataCard>
        <DataCard title="Bowling Style">
          <p>{data.data.bowlingStyle}</p>
        </DataCard>
        <DataCard title="Bowling Type">
          <p>{data.data.bowlingType}</p>
        </DataCard>
        <DataCard title="Matches">
          <p>{data.data.stats?.matches}</p>
        </DataCard>
        <DataCard title="Runs">
          <p>{data.data.stats?.runs}</p>
        </DataCard>
        <DataCard title="Wickets">
          <p>{data.data.stats?.wickets}</p>
        </DataCard>
        <DataCard title="Catches">
          <p>{data.data.stats?.catches}</p>
        </DataCard>
        <DataCard title="Base Amount">
          <p>{data.data.baseRate}</p>
        </DataCard>
        <DataCard title="Sequence No">
          <p>{data.data.SN}</p>
        </DataCard>
        <DataCard title="Bid Winning Amount ">
          <p>{data.data.bidWinningRate}</p>
        </DataCard>
        <DataCard title="Bid Completed">
          <p
            className={
              data.data.isBidded
                ? "text-green-600 font-semibold"
                : "text-red-500 font-semibold"
            }
          >
            {data.data.isBidded ? "Yes" : "No"}
          </p>
        </DataCard>
      </div>

      <div className="w-full mt-8">
        <Table
          dataSource={bidLogData.data}
          style={{ width: "100%" }}
          columns={[
            {
              title: "Bidder Team",
              key: "bidder",
              render: (_, record) => record.team?.fullName || "-",
            },
            {
              title: "Bid Amount",
              dataIndex: "price",
              key: "price",
            },
            {
              title: "Bid Time",
              dataIndex: "createdAt",
              key: "createdAt",
              render: (createdAt) => new Date(createdAt).toLocaleString(),
            },
            {
              title: "Message",
              dataIndex: "message",
              key: "message",
            },
          ]}
        />
      </div>
    </div>
  );
}
