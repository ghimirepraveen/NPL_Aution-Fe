import * as React from "react";
import { Form, InputNumber, Button, Switch } from "antd";

import type { SiteSetting } from "../../../types/interfaces";
import useSiteSettingDetails from "../../../service/admin/sitesetting/useSiteSettingDetails";
import useSiteSettingUpdate from "../../../service/admin/sitesetting/useSiteSettingUpdate";

export default function SiteSetting() {
  const [form] = Form.useForm<SiteSetting>();
  const { data, isLoading } = useSiteSettingDetails();
  const [isEnabled, setIsEnabled] = React.useState(false);

  const SiteSettingUpdate = useSiteSettingUpdate();

  const handleFinish = (values: SiteSetting) => {
    console.log("Submitting values:", values);
    SiteSettingUpdate.mutate(values);
    setIsEnabled(false);
  };

  React.useEffect(() => {
    if (data?.data) {
      form.setFieldsValue(data.data); // dynamically set form values from backend
      setIsEnabled(data.data.isEnabled ?? false);
    }
  }, [data, form]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Site Settings</h2>

      <div className="text-right mb-4">
        <Switch checked={isEnabled} onChange={setIsEnabled} />
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish} // no initialValues here
      >
        <Form.Item
          label="Max Budget For A Team"
          name="maxBudgetForATeam"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} className="w-full" disabled={!isEnabled} />
        </Form.Item>

        <Form.Item
          label="Max Budget For A Category Player"
          name="maxBudgetForACategoryPlayer"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} className="w-full" disabled={!isEnabled} />
        </Form.Item>

        <Form.Item
          label="Max Budget For B Category Player"
          name="maxBudgetForBCategoryPlayer"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} className="w-full" disabled={!isEnabled} />
        </Form.Item>

        <Form.Item
          label="Base Budget For A Category Player"
          name="baseBudgetForACategoryPlayer"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} className="w-full" disabled={!isEnabled} />
        </Form.Item>

        <Form.Item
          label="Base Budget For B Category Player"
          name="baseBudgetForBCategoryPlayer"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} className="w-full" disabled={!isEnabled} />
        </Form.Item>
        <Form.Item
          label="Base Budget For C Category Player"
          name="baseBudgetForCCategoryPlayer"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} className="w-full" disabled={!isEnabled} />
        </Form.Item>
        <Form.Item
          label="Increment Budget For A Category Player"
          name="incrementBudgetForACategoryPlayer"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} className="w-full" disabled={!isEnabled} />
        </Form.Item>
        <Form.Item
          label="Increment Budget For B Category Player"
          name="incrementBudgetForBCategoryPlayer"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} className="w-full" disabled={!isEnabled} />
        </Form.Item>

        <Form.Item
          label="Increment Budget For C Category Player"
          name="incrementBudgetForCCategoryPlayer"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} className="w-full" disabled={!isEnabled} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            disabled={!isEnabled}
          >
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
