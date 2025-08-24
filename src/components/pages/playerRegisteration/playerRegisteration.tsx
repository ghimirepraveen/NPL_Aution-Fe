import Title from "antd/es/typography/Title";
import { Form, Input, Button, Select } from "antd";
import usePlayerRegistration from "../../../service/player/usePlayerRegisteration";
import type { PlayerRegistrationData } from "../../../types/interfaces";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IMAGE from "../../../assets/image.png";

const PlayerRegistration = () => {
  const [form] = Form.useForm();
  const [loading] = useState(false);
  const playerRegistrationMutation = usePlayerRegistration();
  const navigate = useNavigate();

  const handleSubmit = async (data: PlayerRegistrationData) => {
    try {
      const response = await playerRegistrationMutation.mutateAsync(data);
      if (response) {
        navigate("/thankyou");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div
        className="hidden lg:block bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "120%",
        }}
      />
      <div className="flex items-center justify-center px-6 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Title level={2} className="!mb-2">
              Player Registration
            </Title>
          </div>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Email address"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                placeholder="Enter your email"
                className="h-12 rounded-md"
              />
            </Form.Item>
            <Form.Item
              label="Contact Number"
              name="contactNumber"
              rules={[
                { required: true, message: "Please enter your contact number" },
              ]}
            >
              <Input
                placeholder="Enter your contact number"
                className="h-12 rounded-md"
              />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select
                placeholder="Select category"
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Image URL"
              name="image"
              rules={[{ required: true, message: "Please enter image URL" }]}
            >
              <Input
                placeholder="Enter image URL"
                className="h-12 rounded-md"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="h-12 rounded-md bg-gray-300 border-gray-300"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PlayerRegistration;
