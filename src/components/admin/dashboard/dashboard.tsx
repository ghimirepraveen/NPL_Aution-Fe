import DataCard from "../../common/dataCard";
import useDashboardDataFetch from "../../../service/admin/dashboard/useDashboardDataFetch";
import handleError from "../../../utils/handler/error";

const Dashboard = () => {
  const { data, isError, error } = useDashboardDataFetch();

  if (isError && error) {
    handleError(error);
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-left text-black-700 tracking-wide">
        Dashboard
      </h2>

      <h3 className="text-2xl font-semibold mb-4 text-left text-black-700 tracking-wide">
        Welcome 🎉🎉🎉, Admin!
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard title="Total Players">
          <p>{data?.data.playerCount || 0}</p>
        </DataCard>
        <DataCard title="Bidded Players">
          <p>{data?.data.bidedPlayerCount || 0}</p>
        </DataCard>
        <DataCard title="Unbidded Players">
          <p>{data?.data.unBidedPlayerCount || 0}</p>
        </DataCard>
        <DataCard title="Total Amount Spent">
          <p>{data?.data.totalAmountSentToPlayers || 0}</p>
        </DataCard>
        <DataCard title="Total Teams">
          <p>{data?.data.teamCount || 0}</p>
        </DataCard>
      </div>
    </div>
  );
};

export default Dashboard;
