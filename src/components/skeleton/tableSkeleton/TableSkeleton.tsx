import { Space, Skeleton } from "antd";

export default function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Space direction="vertical" size="middle" className="w-full">
      {Array.from(Array(rows).keys())?.map((item) => (
        <Skeleton.Button key={item} active={true} block={true} />
      ))}
    </Space>
  );
}
