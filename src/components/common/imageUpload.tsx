import * as React from "react";
import { Modal, Upload } from "antd";
import { FiUpload } from "react-icons/fi";

import axiosInstance from "../../axiosInstance";
import resizeImage from "../../utils/imageResizer";
import handleError from "../../utils/handler/error";

const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function ImageUpload(props: any) {
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");
  const [uploading, setUploading] = React.useState(false);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj)) as string;
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const customRequest = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    setUploading(true);

    try {
      const formData = new FormData();
      const resizedFile: any = await resizeImage(file);
      formData.append("upload", resizedFile);

      const { data } = await axiosInstance({
        method: "POST",
        url: `upload/local-image`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event: any) =>
          onProgress({ percent: (event?.loaded / event?.total) * 100 }),
      });

      const uploadedFile = {
        uid: file.uid,
        name: data?.filename || file.name,
        status: "done",
        url: data?.path,
        response: data,
      };

      onSuccess(uploadedFile, file);
    } catch (error) {
      handleError(error);
      onError(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Upload
        accept="image/*"
        onPreview={handlePreview}
        customRequest={customRequest}
        {...props}
        listType="picture-card"
        maxCount={1}
        disabled={uploading}
        className="[&_.ant-upload-list-item]:bg-[#f5f5f5]"
      >
        {(!props.fileList || props.fileList.length < 1) && (
          <div>
            <FiUpload />
            <div>Upload</div>
          </div>
        )}
      </Upload>

      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt={previewTitle}
          src={previewImage}
          className="w-full !bg-[#f5f5f5]"
        />
      </Modal>

      {uploading && (
        <div className="text-center text-gray-500 mt-2">Uploading...</div>
      )}
    </div>
  );
}
