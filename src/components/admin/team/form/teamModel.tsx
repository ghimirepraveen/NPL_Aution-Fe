import * as React from "react";
import { Modal, Form, Input, Button } from "antd";
import type { TeamType, TeamRequest } from "../../../../types/interfaces";

import useTeamCreate from "../../../../service/admin/team/useTeamRegisteration";
import useTeamEdit from "../../../../service/admin/team/useTeamEdit";

export default function TeamFormModal({
  open,
  hideModal,
  activeTeam,
}: {
  open: boolean;
  hideModal: () => void;
  activeTeam: TeamType | null;
}) {
  return (
    <Modal open={open} onCancel={hideModal} footer={null}>
      <TeamForm hideModal={hideModal} activeTeam={activeTeam} />
    </Modal>
  );
}

function TeamForm({
  hideModal,
  activeTeam,
}: {
  hideModal: () => void;
  activeTeam: TeamType | null;
}) {
  const [form] = Form.useForm();
  const TeamCreate = useTeamCreate();
  const isEdit = !!activeTeam;
  const teamId = activeTeam?._id || "";
  const TeamEdit = useTeamEdit(teamId);

  React.useEffect(() => {
    if (activeTeam) {
      form.setFieldsValue(activeTeam);
    } else {
      form.resetFields();
    }
  }, [form, activeTeam]);

  const handleSubmit = async (values: TeamRequest) => {
    try {
      if (isEdit && teamId) {
        const { email, ...rest } = values;
        await TeamEdit.mutateAsync(rest);
      } else {
        await TeamCreate.mutateAsync(values);
      }
      hideModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <div>
        {isEdit ? (
          <h2 className="text-2xl font-semibold">Edit Team</h2>
        ) : (
          <h2 className="text-2xl font-semibold">Create New Team</h2>
        )}
        <div className="mt-2 h-px bg-neutral-200" />
      </div>

      <div className="mt-4">
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input placeholder="Enter your full name" size="large" />
        </Form.Item>
        {/* Email not editable */}
        <Form.Item
          name="email"
          label="Email address"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          {/* disable when editing only  */}

          <Input
            placeholder="Enter your email"
            size="large"
            disabled={isEdit}
          />
        </Form.Item>

        <Form.Item
          name="contactNumber"
          label="Contact"
          rules={[{ required: true, message: "Please enter your contact" }]}
        >
          <Input placeholder="Enter your contact" size="large" />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image URL"
          rules={[{ required: true, message: "Please enter image URL" }]}
        >
          <Input placeholder="Enter image URL" size="large" />
        </Form.Item>

        <div className="flex justify-end space-x-2 border-t pt-3">
          <Button onClick={hideModal}>Cancel</Button>
          {isEdit ? (
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          ) : (
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
}
