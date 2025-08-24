import { Menu } from "antd";
import type { MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";

import { IoIosFlag } from "react-icons/io";
import { MdGroups2 } from "react-icons/md";

import useMisc from "../../../hooks/useMics";
import { SUPER_ADMIN, ADMIN } from "../../../constants/userRole";

export default function AdminLayoutSider({
  closeMenu,
}: {
  closeMenu: () => void;
}) {
  const location = useLocation();
  const { authData } = useMisc();

  const isSuperAdmin = authData?.data?.userType?.includes(SUPER_ADMIN)
    ? true
    : false;

  const isAdmin = authData?.data?.userType?.includes(ADMIN) ? true : false;

  const menuItems = [
    {
      key: "/admin",
      label: <Link to="/admin">Dashboard</Link>,
      icon: <AiOutlineDashboard />,
      onClick: () => closeMenu(),
    },

    (isSuperAdmin || isAdmin) && {
      key: "/admin/players",
      label: "Players",
      icon: <MdGroups2 />,
    },
    (isSuperAdmin || isAdmin) && {
      key: "/admin/teams",
      label: "Teams",
      icon: <IoIosFlag />,
    },
  ].filter(Boolean) as MenuProps["items"];

  return (
    <div>
      <div className="flex h-[80px] items-center justify-center pt-4">
        <a href="/" target="_blank">
          <h1 className="text-2xl font-bold">NPL-Auction</h1>
        </a>
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location?.pathname]}
        style={{
          border: "none",
        }}
        items={menuItems}
      />
    </div>
  );
}
