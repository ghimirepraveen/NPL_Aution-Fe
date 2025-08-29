import * as React from "react";
import { Modal, Form, Input, Button } from "antd";
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
