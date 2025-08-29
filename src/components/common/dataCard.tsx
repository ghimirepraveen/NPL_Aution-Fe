import { Card } from "antd";

export default function DataCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Card title={title} variant="borderless">
        {children}
      </Card>
    </div>
  );
}
