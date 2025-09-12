import * as React from "react";
import { Modal, Form, Input, Button } from "antd";
import type { TeamType, TeamRequest } from "../../../../types/interfaces";

import useTeamCreate from "../../../../service/admin/team/useTeamRegisteration";
import useTeamEdit from "../../../../service/admin/team/useTeamEdit";
import ImageUpload from "../../../common/imageUpload";

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
    <Modal open={open} onCancel={hideModal} footer={null} destroyOnClose>
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
      const normalizedData = {
        ...activeTeam,
        image: activeTeam.image
          ? Array.isArray(activeTeam.image)
            ? activeTeam.image
            : [
                {
                  uid: "-1",
                  name: "image",
                  status: "done",
                  url: activeTeam.image,
                  response: { response: { data: { path: activeTeam.image } } },
                },
              ]
          : [],
      };
      form.setFieldsValue(normalizedData);
    } else {
      form.resetFields();
    }
  }, [form, activeTeam]);

  const handleSubmit = async (values: TeamRequest) => {
    try {
      const payload = {
        ...values,
        image: values?.image?.[0]?.response?.response?.data?.path || "",
      };

      if (isEdit && teamId) {
        const { email, ...rest } = payload;
        await TeamEdit.mutateAsync(rest);
      } else {
        await TeamCreate.mutateAsync(payload);
      }
      hideModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <div>
        <h2 className="text-2xl font-semibold">
          {isEdit ? "Edit Team" : "Create New Team"}
        </h2>
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

        <Form.Item
          name="email"
          label="Email address"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
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
          label="Team Image"
          valuePropName="fileList"
          rules={[{ required: true, message: "Please upload an image" }]}
          getValueFromEvent={(e) =>
            Array.isArray(e?.fileList) ? e.fileList : []
          }
        >
          <ImageUpload
            listType="picture-card"
            maxCount={1}
            hideUploader={form.getFieldValue("image")?.length > 0}
          />
        </Form.Item>

        <div className="flex justify-end space-x-2 border-t pt-3">
          <Button onClick={hideModal}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            {isEdit ? "Update" : "Add"}
          </Button>
        </div>
      </div>
    </Form>
  );
}
