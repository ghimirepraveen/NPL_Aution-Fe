import * as React from "react";
import { Table, Input, Button } from "antd";

import usePlayerFetch from "../../../service/player/usePlayerFetch";

import PlayerFormModal from "../player/form/playerModel";
import TableSkeleton from "../../skeleton/tableSkeleton/TableSkeleton";
import { IoSettingsOutline } from "react-icons/io5";

import type { PlayerType } from "../../../types/interfaces";
import type { TablePaginationConfig } from "antd";

export default function Player() {
  const [queryParams, setQueryParams] = React.useState<{
    page: number;
    limit: number;
    search?: string;
  }>({
    page: 1,
    limit: 10,
    search: undefined,
  });

  const [activePlayer, setActivePlayer] = React.useState<PlayerType | null>(
    null
  );
  const [showPlayerFormModal, setShowPlayerFormModal] = React.useState(false);

  const { isLoading, data } = usePlayerFetch(queryParams);

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

  const handleAddPlayer = () => {
    setActivePlayer(null);
    setShowPlayerFormModal(true);
  };

  const handleViewPlayer = (player: PlayerType) => {
    setActivePlayer(player);
    setShowPlayerFormModal(true);
  };

  const hidePlayerFormModal = () => {
    setActivePlayer(null);
    setShowPlayerFormModal(false);
  };

  const columns = [
    {
      title: "SN",
      key: "index",
      render: (_: unknown, record: unknown, index: number) =>
        (queryParams?.page - 1) * queryParams?.limit + (index + 1),
    },
    {
      title: "Player Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Base Rate",
      dataIndex: "baseRate",
    },
    {
      title: "Sequence No",
      dataIndex: "SN",
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt: string) => {
        const date = new Date(createdAt);
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: unknown) => (
        <div className="flex items-center gap-4">
          <span
            role="button"
            onClick={() => handleViewPlayer(record as PlayerType)}
          >
            <IoSettingsOutline className="text-2xl text-neutral-500" />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary" onClick={handleAddPlayer}>
          Create New Player
        </Button>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-3xl font-semibold capitalize text-neutral-700">
          Player{" "}
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
            rowClassName={(record: PlayerType) => {
              switch (record.category) {
                case "A":
                  return "bg-blue-100";
                case "B":
                  return "bg-green-100";
                case "C":
                  return "bg-yellow-100";
                default:
                  return "";
              }
            }}
          />
        )}
      </div>

      <PlayerFormModal
        open={showPlayerFormModal}
        activePlayer={activePlayer}
        hideModal={hidePlayerFormModal}
      />
    </div>
  );
}
