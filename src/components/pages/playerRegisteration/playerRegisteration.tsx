import Title from "antd/es/typography/Title";
import { Form, Input, Button, Select } from "antd";
import usePlayerRegistration from "../../../service/admin/player/usePlayerRegisteration";
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
      <div className="hidden lg:block relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
          }}
        />
      </div>

      <div className="flex flex-col bg-white h-screen overflow-y-auto p-6">
        <div className="text-center mb-6">
          <Title level={2} className="!mb-2">
            Player Registration
          </Title>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="w-full"
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input
              className="h-12 rounded-md"
              placeholder="Enter your full name"
            />
          </Form.Item>

          <Form.Item
            label="Email address"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Enter your email" className="h-12 rounded-md" />
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

          {/* height of input field should be same */}
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              placeholder="Select category"
              className="h-12 rounded-md"
              options={[
                { value: "A", label: "A" },
                { value: "B", label: "B" },
                { value: "C", label: "C" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="playingStyle"
            label="Playing Style"
            rules={[{ required: true, message: "Please select playing style" }]}
          >
            <Select
              placeholder="Select playing style"
              className="h-12 rounded-md"
              options={[
                { value: "Batsman", label: "Batsman" },
                { value: "Bowler", label: "Bowler" },
                { value: "All-Rounder", label: "All-Rounder" },
                { value: "Wicket-Keeper", label: "Wicket-Keeper" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="battingStyle"
            label="Batting Style"
            rules={[{ required: true, message: "Please select batting style" }]}
          >
            <Select
              placeholder="Select batting style"
              className="h-12 rounded-md"
              options={[
                { value: "Right-Handed", label: "Right-Handed" },
                { value: "Left-Handed", label: "Left-Handed" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="bowlingStyle"
            label="Bowling Style"
            rules={[{ required: true, message: "Please select bowling style" }]}
          >
            <Select
              placeholder="Select bowling style"
              className="h-12 rounded-md"
              options={[
                { value: "Right-Arm", label: "Right-Arm" },
                { value: "Left-Arm", label: "Left-Arm" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="bowlingType"
            label="Bowling Type"
            rules={[{ required: true, message: "Please select bowling type" }]}
          >
            <Select
              placeholder="Select bowling type"
              className="h-12 rounded-md"
              options={[
                { value: "Pace", label: "Pace" },
                { value: "Spin", label: "Spin" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Matches" name={["stats", "matches"]}>
            <Input
              className="h-12 rounded-md"
              type="number"
              min={0}
              placeholder="Matches"
            />
          </Form.Item>
          <Form.Item label="Runs" name={["stats", "runs"]}>
            <Input
              className="h-12 rounded-md"
              type="number"
              min={0}
              placeholder="Runs"
            />
          </Form.Item>
          <Form.Item label="Wickets" name={["stats", "wickets"]}>
            <Input
              className="h-12 rounded-md"
              type="number"
              min={0}
              placeholder="Wickets"
            />
          </Form.Item>
          <Form.Item label="Catches" name={["stats", "catches"]}>
            <Input
              className="h-12 rounded-md"
              type="number"
              min={0}
              placeholder="Catches"
            />
          </Form.Item>

          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input placeholder="Enter image URL" className="h-12 rounded-md" />
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
  );
};

export default PlayerRegistration;
