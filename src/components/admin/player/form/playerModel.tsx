import * as React from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import type {
  PlayerType,
  PlayerRegistrationData,
} from "../../../../types/interfaces";
import usePlayerCreate from "../../../../service/admin/player/usePlayerRegisteration";
import ImageUpload from "../../../common/imageUpload";

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
    <Modal open={open} onCancel={hideModal} footer={null} destroyOnClose>
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

  const isViewMode = !!activePlayer; // if activePlayer exists, view-only mode

  React.useEffect(() => {
    if (activePlayer) {
      // Normalize image field to be an array for Antd Upload
      const normalizedData = {
        ...activePlayer,
        image: activePlayer.image
          ? Array.isArray(activePlayer.image)
            ? activePlayer.image
            : [
                {
                  uid: "-1",
                  name: "image",
                  status: "done",
                  url: activePlayer.image,
                  response: {
                    response: { data: { path: activePlayer.image } },
                  },
                },
              ]
          : [],
      };
      form.setFieldsValue(normalizedData);
    } else {
      form.resetFields();
    }
  }, [form, activePlayer]);

  const handleSubmit = async (values: PlayerRegistrationData) => {
    if (isViewMode) return; // prevent submission in view mode

    try {
      const payload = {
        ...values,
        image: values?.image?.[0]?.response?.response?.data?.path || "",
      };
      console.log("Payload to submit:", payload);
      await PlayerCreate.mutateAsync(payload);
      hideModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <div>
        <h2 className="text-2xl font-semibold">
          {isViewMode ? "Player Details" : "Create New Player"}
        </h2>
        <div className="mt-2 h-px bg-neutral-200" />
      </div>

      <div className="mt-4">
        <Form.Item name="fullName" label="Full Name">
          <Input placeholder="Full Name" size="large" disabled={isViewMode} />
        </Form.Item>

        <Form.Item name="email" label="Email address">
          <Input placeholder="Email" size="large" disabled={isViewMode} />
        </Form.Item>

        <Form.Item name="contactNumber" label="Contact Number">
          <Input
            placeholder="Contact Number"
            size="large"
            disabled={isViewMode}
          />
        </Form.Item>

        <Form.Item name="category" label="Category">
          <Input
            placeholder="Category (A, B, C)"
            size="large"
            disabled={isViewMode}
          />
        </Form.Item>

        <Form.Item name="playingStyle" label="Playing Style">
          <Select placeholder="Select playing style" disabled={isViewMode}>
            <Select.Option value="Batsman">Batsman</Select.Option>
            <Select.Option value="Bowler">Bowler</Select.Option>
            <Select.Option value="All-Rounder">All-Rounder</Select.Option>
            <Select.Option value="Wicket-Keeper">Wicket-Keeper</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="battingStyle" label="Batting Style">
          <Select placeholder="Select batting style" disabled={isViewMode}>
            <Select.Option value="Right-Handed">Right-Handed</Select.Option>
            <Select.Option value="Left-Handed">Left-Handed</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="bowlingStyle" label="Bowling Style">
          <Select placeholder="Select bowling style" disabled={isViewMode}>
            <Select.Option value="Right-Arm">Right-Arm</Select.Option>
            <Select.Option value="Left-Arm">Left-Arm</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="bowlingType" label="Bowling Type">
          <Select placeholder="Select bowling type" disabled={isViewMode}>
            <Select.Option value="Pace">Pace</Select.Option>
            <Select.Option value="Spin">Spin</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Matches" name={["stats", "matches"]}>
          <Input
            type="number"
            min={0}
            placeholder="Matches"
            disabled={isViewMode}
          />
        </Form.Item>

        <Form.Item label="Runs" name={["stats", "runs"]}>
          <Input
            type="number"
            min={0}
            placeholder="Runs"
            disabled={isViewMode}
          />
        </Form.Item>

        <Form.Item label="Wickets" name={["stats", "wickets"]}>
          <Input
            type="number"
            min={0}
            placeholder="Wickets"
            disabled={isViewMode}
          />
        </Form.Item>

        <Form.Item label="Catches" name={["stats", "catches"]}>
          <Input
            type="number"
            min={0}
            placeholder="Catches"
            disabled={isViewMode}
          />
        </Form.Item>

        <Form.Item
          name="image"
          label="Player Image"
          valuePropName="fileList"
          getValueFromEvent={(e) =>
            Array.isArray(e?.fileList) ? e.fileList : []
          }
        >
          <ImageUpload
            disabled={true} // always view-only
            listType="picture-card"
            maxCount={1}
            hideUploader
          />
        </Form.Item>

        <div className="flex justify-end space-x-2 border-t pt-3">
          <Button onClick={hideModal}>Close</Button>
          {!isViewMode && (
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
}
