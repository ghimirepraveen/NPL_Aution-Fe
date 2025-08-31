import * as React from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import type {
  PlayerType,
  PlayerRegistrationData,
} from "../../../../types/interfaces";

import usePlayerCreate from "../../../../service/admin/player/usePlayerRegisteration";

export default function PlayerFormModal({
  open,
  hideModal,
  activePlayer,
}: {
  open: boolean;
  hideModal: () => void;
  activePlayer: PlayerType | null;
}) {
  return (
    <Modal open={open} onCancel={hideModal} footer={null}>
      <PlayerForm hideModal={hideModal} activePlayer={activePlayer} />
    </Modal>
  );
}

function PlayerForm({
  hideModal,
  activePlayer,
}: {
  hideModal: () => void;
  activePlayer: PlayerType | null;
}) {
  const [form] = Form.useForm();
  const PlayerCreate = usePlayerCreate();

  React.useEffect(() => {
    if (activePlayer) {
      form.setFieldsValue(activePlayer);
    } else {
      form.resetFields();
    }
  }, [form, activePlayer]);

  const handleSubmit = async (values: PlayerRegistrationData) => {
    try {
      await PlayerCreate.mutateAsync(values);
      hideModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <div>
        {activePlayer ? (
          <h2 className="text-2xl font-semibold">Players Details</h2>
        ) : (
          <h2 className="text-2xl font-semibold">Create New Player</h2>
        )}
        <div className="mt-2 h-px bg-neutral-200" />
      </div>

      <div className="mt-4">
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input
            placeholder="Enter your full name"
            size="large"
            disabled={!!activePlayer}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email address"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input
            placeholder="Enter your email"
            size="large"
            disabled={!!activePlayer}
          />
        </Form.Item>

        <Form.Item
          name="contactNumber"
          label="Contact Number"
          rules={[
            { required: true, message: "Please enter your contact number" },
          ]}
        >
          <Input
            placeholder="Enter your contact number"
            size="large"
            disabled={!!activePlayer}
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Input
            placeholder="Enter category (A, B, C)"
            size="large"
            disabled={!!activePlayer}
          />
        </Form.Item>
        <Form.Item
          name="playingStyle"
          label="Playing Style"
          rules={[{ required: true, message: "Please select playing style" }]}
        >
          <Select placeholder="Select playing style">
            <Select.Option size="large" value="Batsman">
              Batsman
            </Select.Option>
            <Select.Option size="large" value="Bowler">
              Bowler
            </Select.Option>
            <Select.Option size="large" value="All-Rounder">
              All-Rounder
            </Select.Option>
            <Select.Option size="large" value="Wicket-Keeper">
              Wicket-Keeper
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="battingStyle"
          label="Batting Style"
          rules={[{ required: true, message: "Please select batting style" }]}
        >
          <Select placeholder="Select batting style">
            <Select.Option value="Right-Handed">Right-Handed</Select.Option>
            <Select.Option value="Left-Handed">Left-Handed</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="bowlingStyle"
          label="Bowling Style"
          rules={[{ required: true, message: "Please select bowling style" }]}
        >
          <Select placeholder="Select bowling style">
            <Select.Option value="Right-Arm">Right-Arm</Select.Option>
            <Select.Option value="Left-Arm">Left-Arm</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="bowlingType"
          label="Bowling Type"
          rules={[{ required: true, message: "Please select bowling type" }]}
        >
          <Select placeholder="Select bowling type">
            <Select.Option value="Pace">Pace</Select.Option>
            <Select.Option value="Spin">Spin</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Matches" name={["stats", "matches"]}>
          <Input type="number" min={0} placeholder="Matches" />
        </Form.Item>
        <Form.Item label="Runs" name={["stats", "runs"]}>
          <Input type="number" min={0} placeholder="Runs" />
        </Form.Item>
        <Form.Item label="Wickets" name={["stats", "wickets"]}>
          <Input type="number" min={0} placeholder="Wickets" />
        </Form.Item>
        <Form.Item label="Catches" name={["stats", "catches"]}>
          <Input type="number" min={0} placeholder="Catches" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image URL"
          rules={[{ required: true, message: "Please enter image URL" }]}
        >
          <Input
            placeholder="Enter image URL"
            size="large"
            disabled={!!activePlayer}
          />
        </Form.Item>

        <div className="flex justify-end space-x-2 border-t pt-3">
          <Button onClick={hideModal}>Cancel</Button>
          {!activePlayer && (
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
}
