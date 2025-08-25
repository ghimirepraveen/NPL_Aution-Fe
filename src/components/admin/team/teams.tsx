import * as React from "react";
import { Table, Input, Button } from "antd";

import useTeamFetch from "../../../service/team/useTeamFetch";

import TeamFormModal from "../team/form/teamModel";
import TableSkeleton from "../../skeleton/tableSkeleton/TableSkeleton";
import { IoSettingsOutline } from "react-icons/io5";

import type { TeamType } from "../../../types/interfaces";
import type { TablePaginationConfig } from "antd";

export default function Team() {
  const [queryParams, setQueryParams] = React.useState<{
    page: number;
    limit: number;
    search?: string;
  }>({
    page: 1,
    limit: 10,
    search: undefined,
  });

  const [activeTeam, setActiveTeam] = React.useState<TeamType | null>(null);
  const [showTeamFormModal, setShowTeamFormModal] = React.useState(false);

  const { isLoading, data } = useTeamFetch(queryParams);

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

  const handleAddTeam = () => {
    setActiveTeam(null);
    setShowTeamFormModal(true);
  };

  const handleViewTeam = (Team: TeamType) => {
    setActiveTeam(Team);
    setShowTeamFormModal(true);
  };

  const hideTeamFormModal = () => {
    setActiveTeam(null);
    setShowTeamFormModal(false);
  };

  const columns = [
    {
      title: "SN",
      key: "index",
      render: (_: unknown, record: unknown, index: number) =>
        (queryParams?.page - 1) * queryParams?.limit + (index + 1),
    },
    {
      title: "Team Name",
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
      title: "Budget",
      dataIndex: "budget",
    },
    {
      title: "Remaining Budget",
      dataIndex: "remainingBudget",
    },

    {
      title: "No of Players",
      dataIndex: "players",
      render: (players: []) => players?.length || "No player added",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: unknown) => (
        <div className="flex items-center gap-4">
          <span
            role="button"
            title="View"
            onClick={() => handleViewTeam(record as TeamType)}
          >
            <IoSettingsOutline className="text-2xl text-neutral-500" />
          </span>
          <span
            role="button"
            title="Edit"
            onClick={() => handleEditTeam(record as TeamType)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487a2.25 2.25 0 1 1 3.182 3.182L7.5 20.213l-4 1 1-4 13.362-13.362z"
              />
            </svg>
          </span>
        </div>
      ),
    },
  ];

  const handleEditTeam = (team: TeamType) => {
    setActiveTeam(team);
    setShowTeamFormModal(true);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary" onClick={handleAddTeam}>
          Create New Team
        </Button>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-3xl font-semibold capitalize text-neutral-700">
          Team{" "}
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

      <TeamFormModal
        open={showTeamFormModal}
        activeTeam={activeTeam}
        hideModal={hideTeamFormModal}
      />
    </div>
  );
}
