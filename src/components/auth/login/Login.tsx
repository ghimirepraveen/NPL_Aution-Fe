import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, notification, Checkbox } from "antd";

import useMisc from "../../../hooks/useMics";
import useLogin from "../../../service/auth/useLogin";
import type { LoginRequest, ErrorData } from "../../../types/interfaces";
import { useEffect } from "react";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [showResendVerificationEmailLink, setShowResendVerificationEmailLink] =
    React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(
    localStorage.getItem("rememberMe") ? true : false
  );

  const misc = useMisc();
  const { authData } = misc || {};

  const login = useLogin();

  //  const resendVerificationEmail: unknown = useResendVerificationEmail();

  const handleSubmit = async (data: LoginRequest) => {
    try {
      await login.mutateAsync(data);

      if (rememberMe) {
        localStorage.setItem("rememberMe", data?.email);
      } else {
        localStorage.removeItem("rememberMe");
      }

      notification.success({
        message: "You are logged in",
      });
    } catch (error: unknown) {
      if ((error as ErrorData)?.response?.status === 445) {
        return setShowResendVerificationEmailLink(true);
      }

      if (showResendVerificationEmailLink) {
        return setShowResendVerificationEmailLink(false);
      }

      return;
    }
  };

  //   const handleResendVerificationEmail = async () => {
  //     try {
  //       await resendVerificationEmail.mutateAsync({
  //         email: form.getFieldValue("email"),
  //       });
  //       setShowResendVerificationEmailLink(false);
  //     } catch (error) {
  //       return;
  //     }
  //   };

  console.log("this is login page ", authData);
  useEffect(() => {
    if (!authData) return; // wait until authData exists

    if (
      authData.data.userType === "Admin" ||
      authData.data.userType === "SuperAdmin"
    ) {
      navigate("/admin/dashboard");
    } else if (authData.data.userType === "Team") {
      navigate("/admin/team");
    }
  }, [authData, navigate]);

  return (
    //design login card
    <div className="bg-white rounded-lg shadow-lg p-4 w-[30rem] mx-auto mt-24">
      <div className="bg-blue-100 p-4 rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <p className="text-center m-4 text-gray-400">
          Please enter your credentials to log in.
        </p>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              Remember Me
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
