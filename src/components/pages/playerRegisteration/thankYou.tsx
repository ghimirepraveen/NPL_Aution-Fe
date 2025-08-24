import { Button } from "antd";

const ThankYouPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-600">
          Your registration has been successfully submitted.
        </p>

        <div className="flex justify-center m-4">
          <Button type="primary" onClick={() => (window.location.href = "/")}>
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
