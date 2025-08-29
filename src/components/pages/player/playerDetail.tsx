import { useParams } from "react-router-dom";
import usePlayerdetail from "../../../service/admin/player/usePlayerFetch";
import useBidLog from "../../../service/admin/bidLog/useBidLogFetch";

import DataCard from "../../common/dataCard";

import type { Player } from "../../../types/interfaces";
import { Image, Table } from "antd";

export default function Player() {
  const { id } = useParams<{ id: string }>() || null;

  const { isLoading, data } = usePlayerdetail({ id });
  const { data: bidLogData, isLoading: isBidLogLoading } = useBidLog({
    player: id,
  });
  if (isLoading || isBidLogLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Player Details</h1>
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

        <Image src={data.data.imageUrl} alt={data.data.fullName} />

        <div>
          <Table
            dataSource={bidLogData.data}
            columns={[
              {
                title: "Bidder",
                dataIndex: "bidder",
                key: "bidder",
              },
              {
                title: "Bid Amount",
                dataIndex: "amount",
                key: "amount",
              },
              {
                title: "Bid Time",
                dataIndex: "time",
                key: "time",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
