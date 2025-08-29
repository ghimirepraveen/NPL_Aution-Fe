import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Title from "antd/es/typography/Title";
import { Form, Input, Button, Tag } from "antd";
import useEmailTempletEdit from "../../../../service/admin/emailTemplet/useEmailTempletEdit";
import useEmailTemplateDetails from "../../../../service/admin/emailTemplet/useEmailTempletDetail";
import type { EmailTemplate } from "../../../../types/interfaces";

function Editor({ props }: { props: any }) {
  const editorOptions = {
    buttonList: [
      ["font", "fontSize", "formatBlock"],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["fontColor", "hiliteColor", "textStyle"],
      ["outdent", "indent"],
      ["align", "horizontalRule", "list", "lineHeight"],
      ["table", "link", "image", "video"],
      ["fullScreen", "codeView", "preview", "print"],
    ],
    height: "auto",
    mode: "classic",
    resizingBar: true,
    defaultStyle: "font-size: 16px;",
    imageFileInput: false,
  };
  return (
    <div className="editor_wrapper">
      <SunEditor {...props} setOptions={editorOptions} />
    </div>
  );
}

const UpdateEmailTemplate = () => {
  const [form] = Form.useForm();
  const [loading] = useState(false);

  const { slug } = useParams<{ slug: string }>();

  const { isLoading, data } = useEmailTemplateDetails({
    slug: slug || "",
  });

  const emailTemplateMutation = useEmailTempletEdit(slug || "");
  const navigate = useNavigate();

  const handleSubmit = async (formData: EmailTemplate) => {
    try {
      const response = await emailTemplateMutation.mutateAsync(formData);
      if (response) {
        navigate(-1);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const initialValues = data?.data || {};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center px-1 bg-white col-span-full">
        <div className="w-full max-w-full">
          <div className="text-center mb-8">
            <Title level={2} className="!mb-2">
              Update Email Template
            </Title>
          </div>
          <div className="text-center">
            <Form
              form={form}
              layout="vertical"
              initialValues={initialValues}
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Subject"
                name="subject"
                rules={[
                  { required: true, message: "Please enter the email subject" },
                ]}
              >
                <Input placeholder="Enter email subject" />
              </Form.Item>

              <Form.Item label="Available Variables">
                <div className="space-x-2">
                  {initialValues.keywords?.map((key: string) => (
                    <Tag className="text-sm" color="blue" key={key}>
                      {key}
                    </Tag>
                  ))}
                </div>
              </Form.Item>

              <Form.Item
                name="content"
                label="Content"
                initialValue={initialValues.content}
                getValueFromEvent={(content) => content}
                rules={[
                  { required: true, message: "Please enter email content" },
                  {
                    validator: async (_, value) => {
                      if (value === "<p><br></p>") {
                        return Promise.reject("Please enter email content");
                      }
                    },
                  },
                ]}
              >
                <Editor
                  setContents={initialValues.content}
                  onChange={(content: string) =>
                    form.setFieldsValue({ content })
                  }
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                className="h-12 rounded-md !w-1/4 inline-block  bg-gray-300 border-gray-300"
              >
                Update
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmailTemplate;
