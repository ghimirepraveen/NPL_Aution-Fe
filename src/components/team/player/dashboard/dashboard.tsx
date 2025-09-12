import DataCard from "../../../common/dataCard";
import useMisc from "../../../../hooks/useMics";

const Dashboard = () => {
  const { authData } = useMisc();

  console.log(authData);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-left text-black-700 tracking-wide">
        Dashboard
      </h2>

      <h3 className="text-2xl font-semibold mb-4 text-left text-black-700 tracking-wide">
        Welcome 🎉🎉🎉, {authData?.data?.fullName}!
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard title="Team Name">
          <p>{authData?.data?.fullName}</p>
        </DataCard>
        <DataCard title="Remaining Budget">
          <p>{authData?.data?.remainingBudget}</p>
        </DataCard>
        <DataCard title="Total Spend">
          <p>
            {(authData?.data?.budget || 0) -
              (authData?.data?.remainingBudget || 0)}
          </p>
        </DataCard>
      </div>
    </div>
  );
};

export default Dashboard;
