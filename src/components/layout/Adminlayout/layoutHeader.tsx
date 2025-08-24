import { Layout, Grid, Dropdown, Avatar } from "antd";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import {
  RiMenuFoldFill,
  RiMenuUnfoldFill,
  RiArrowDownSLine,
} from "react-icons/ri";

import useMisc from "../../../hooks/useMics";

interface AdminLayoutHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  openMenu: () => void;
}

export default function AdminLayoutHeader({
  collapsed,
  setCollapsed,
  openMenu,
}: AdminLayoutHeaderProps) {
  const handleLogout = () => {
    authLogout();
  };

  const { authData, authLogout } = useMisc();

  const { Header } = Layout;
  const screens = Grid.useBreakpoint();

  const menuItems = [
    {
      key: "profile",
      label: <Link to="/admin/profile">My Profile</Link>,
    },
    {
      key: "change-password",
      label: <Link to="/admin/change-password">Change Password</Link>,
    },
    {
      key: "logout",
      label: "Logout",
      onClick: () => handleLogout(),
    },
  ];

  return (
    <Header
      style={{
        left: screens.lg ? (collapsed ? 80 : 200) : 0,
        padding: "1rem",
        background: "#fafafa",
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 999,
        height: "auto",
        transition: "all 0.3s",
      }}
    >
      <div
        style={{
          height: "64px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.5rem",
          borderRadius: "0.625rem",
          border: "1px soild #fafafa",
          background: "#fff",
          padding: "0.5rem 1rem",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        }}
      >
        {screens.lg ? (
          collapsed ? (
            <RiMenuUnfoldFill
              size={24}
              onClick={() => setCollapsed(false)}
              className="inline-block cursor-pointer"
            />
          ) : (
            <RiMenuFoldFill
              size={24}
              onClick={() => setCollapsed(true)}
              className="inline-block cursor-pointer"
            />
          )
        ) : (
          <CgMenuLeft
            size={24}
            onClick={() => openMenu()}
            className="inline-block cursor-pointer"
          />
        )}
        <div className="flex gap-x-3">
          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottom"
          >
            <div className="flex items-center justify-center" role="button">
              {authData?.data?.image ? (
                <Avatar
                  src={authData?.data?.image}
                  size={40}
                  className="border border-neutral-100"
                />
              ) : (
                <Avatar
                  icon={<AiOutlineUser />}
                  size={36}
                  className="inline-flex items-center justify-center"
                />
              )}
              {authData?.data?.fullName && (
                <span className="ml-1 text-base capitalize">
                  {authData?.data?.fullName?.split(" ")[0]}
                </span>
              )}
              <RiArrowDownSLine size={18} className="inline-block" />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}
