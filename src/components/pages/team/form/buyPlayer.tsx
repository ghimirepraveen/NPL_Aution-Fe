import React, { useState } from "react";
import { Modal, Button, Form, Select } from "antd";
import useFetchPlayerForSelect from "../../../../service/admin/player/usePlayerForSelect";
import useBuyPlayer from "../../../../service/admin/team/useBuyPlayer";

const BuyFormModal = ({ open, teamId, hideModal }) => {
  const { data: players } = useFetchPlayerForSelect();
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const buyPlayer = useBuyPlayer(teamId);

  const handleBuyPlayer = () => {
    if (selectedPlayer) {
      buyPlayer.mutate({ player: selectedPlayer });
      hideModal();
    }
  };

  return (
    <Modal title="Buy Player" open={open} onCancel={hideModal} footer={null}>
      <Form>
        <Form.Item label="Select Player">
          <Select
            value={selectedPlayer}
            onChange={setSelectedPlayer}
            placeholder="Select a player"
          >
            {players?.data.map((player) => (
              <Select.Option key={player._id} value={player._id}>
                {player.fullName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Button
        type="primary"
        onClick={handleBuyPlayer}
        disabled={!selectedPlayer || buyPlayer.isLoading}
        loading={buyPlayer.isLoading}
      >
        Confirm
      </Button>
    </Modal>
  );
};

export default BuyFormModal;
