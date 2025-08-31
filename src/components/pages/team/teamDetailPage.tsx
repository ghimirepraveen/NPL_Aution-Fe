import * as React from "react";
import { useParams, useNavigate } from "react-router-dom"; // 👈 useNavigate here
import useTeamdetail from "../../../service/admin/team/useTeamdetail";

import DataCard from "../../common/dataCard";
import PlayerProfileCard from "../../common/playerProfileCard";
import type { Player } from "../../../types/interfaces";
import { ADMIN, SUPER_ADMIN } from "../../../constants/userRole";

import useAuth from "../../../hooks/useMics";
import { Button } from "antd";
import BuyFormModal from "./form/buyPlayer";

export default function Team() {
  const { id } = useParams<{ id: string }>() || null;
  const navigate = useNavigate();
  const { authData } = useAuth();

  const [activeBuy, setActiveBuy] = React.useState<Player | null>(null);
  const [showBuyFormModal, setShowBuyFormModal] = React.useState(false);

  if (!id) return <p>No team ID provided.</p>;

  const { isLoading, data } = useTeamdetail({ id: id || "" });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No team details found.</p>;

  const handlePlayerClick = (player: Player) => {
    navigate(`/admin/player/${player._id}`);
  };

  const handleBuyPlayer = (player: Player) => {
    setActiveBuy(player);
    setShowBuyFormModal(true);
  };

  console.log("Team details data:", data);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold mb-6 text-left text-black-700 tracking-wide">
          Team Details
        </h2>

        {(authData?.data?.userType === SUPER_ADMIN ||
          authData?.data?.userType === ADMIN) && (
          <Button
            className="btn btn-primary"
            onClick={() => handleBuyPlayer(data.data._id)}
          >
            Buy Player
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DataCard title="Team Name">
          <p>{data.data.fullName}</p>
        </DataCard>
        <DataCard title="Remaining Budget">
          <p>{data.data.remainingBudget}</p>
        </DataCard>
        <DataCard title="Total Spend">
          <p>{data.data.budget - data.data.remainingBudget}</p>
        </DataCard>
        <DataCard title="Total Players">
          <p>{data.data.players?.length ?? 0}</p>
        </DataCard>

        <div className="col-span-full mt-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-6 text-left text-black-700 tracking-wide">
              Players Won in Auction
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.data.players?.length ? (
                data.data.players.map((player: Player) => (
                  <div
                    key={player._id}
                    onClick={() => handlePlayerClick(player)}
                    className="cursor-pointer"
                  >
                    <PlayerProfileCard
                      imageUrl={player.image}
                      title={player.fullName}
                      bidWinningRate={player.bidWinningRate}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-400 py-8">
                  No players found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <BuyFormModal
        open={showBuyFormModal}
        teamId={activeBuy}
        hideModal={() => setShowBuyFormModal(false)}
      />
    </div>
  );
}
