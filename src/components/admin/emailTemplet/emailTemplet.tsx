import * as React from "react";
import { Table, Input } from "antd";

import useEmailTemplateFetch from "../../../service/admin/emailTemplet/useEmailTempletFetch";

import TableSkeleton from "../../skeleton/tableSkeleton/TableSkeleton";
import { IoMdSettings } from "react-icons/io";

import type { EmailTemplateType } from "../../../types/interfaces";
import type { TablePaginationConfig } from "antd";
import { useNavigate } from "react-router-dom";

export default function EmailTemplate() {
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = React.useState<{
    page: number;
    limit: number;
    search?: string;
  }>({
    page: 1,
    limit: 10,
    search: undefined,
  });

  const { isLoading, data } = useEmailTemplateFetch(queryParams);

  const handlePaginationChange = (pagination: TablePaginationConfig) => {
    setQueryParams({
      ...queryParams,
      page: pagination.current || 1,
      limit: pagination.pageSize || 10,
    });
  };

  const handleSearchChange = (value: string) => {
    if (value === "") {
      return setQueryParams({
        page: 1,
        limit: 10,
        search: undefined,
      });
    }
  };

  const handleSearch = (value: string) => {
    if (value === "") {
      return setQueryParams({
        page: 1,
        limit: 10,
        search: undefined,
      });
    }

    setQueryParams({
      page: 1,
      limit: 10,
      search: value as string,
    });
  };
  const handleViewEmailTemplate = (record: EmailTemplateType) => {
    navigate(`/admin/email-template/${record?.slug}`);
  };

  const columns = [
    {
      title: "SN",
      key: "index",
      render: (_: unknown, record: unknown, index: number) =>
        (queryParams?.page - 1) * queryParams?.limit + (index + 1),
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: unknown) => (
        <div className="flex items-center gap-4">
          <span
            role="button"
            onClick={() => handleViewEmailTemplate(record as EmailTemplateType)}
          >
            <IoMdSettings className="text-2xl text-neutral-500" />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end"></div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-3xl font-semibold capitalize text-neutral-700">
          EmailTemplate{" "}
          {data?.data?.pagination?.total
            ? ` (${data?.data?.pagination?.total})`
            : ""}
        </h1>
        <div className="max-w-sm">
          <Input.Search
            allowClear
            placeholder="Search..."
            onChange={(e) => handleSearchChange(e.target.value)}
            onSearch={(value) => handleSearch(value)}
          />
        </div>
      </div>
      <div className="mt-3">
        {isLoading && <TableSkeleton />}
        {data && (
          <Table
            columns={columns}
            dataSource={data?.data?.docs || data?.data || []}
            rowKey="_id"
            pagination={{
              current: queryParams?.page,
              pageSize: queryParams?.limit,
              total: data?.data?.pagination?.total,
            }}
            onChange={handlePaginationChange}
            scroll={{ x: true }}
          />
        )}
      </div>
    </div>
  );
}
