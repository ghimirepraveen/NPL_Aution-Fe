import { Menu } from "antd";
import type { MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";

import { IoIosFlag } from "react-icons/io";
import { MdGroups2 } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";

import useMisc from "../../../hooks/useMics";
import { SUPER_ADMIN, ADMIN, TEAM } from "../../../constants/userRole";

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

  const isTeam = authData?.data?.userType?.includes(TEAM) ? true : false;

  const menuItems = [
    (isSuperAdmin || isAdmin) && {
      key: "/admin",
      label: <Link to="/admin">Dashboard</Link>,
      icon: <AiOutlineDashboard />,
      onClick: () => closeMenu(),
    },

    (isSuperAdmin || isAdmin) && {
      key: "/admin/players",
      label: <Link to="/admin/players">Players</Link>,
      icon: <MdGroups2 />,
    },
    (isSuperAdmin || isAdmin) && {
      key: "/admin/teams",
      label: <Link to="/admin/teams">Teams</Link>,
      icon: <IoIosFlag />,
    },
    (isSuperAdmin || isAdmin) && {
      key: "/admin/settings",
      label: <Link to="/admin/settings">Settings</Link>,
      icon: <IoIosSettings />,
    },
    (isSuperAdmin || isAdmin) && {
      key: "/admin/email-templates",
      label: <Link to="/admin/email-templates">Email Templates</Link>,
      icon: <IoIosSettings />,
    },
    (isSuperAdmin || isAdmin) && {
      key: "/admin/admin-auction",
      label: <Link to="/admin/admin-auction">Admin Auction</Link>,
      icon: <IoIosSettings />,
    },
    isTeam && {
      key: "/team",
      label: <Link to="/team">Team Dashboard</Link>,
      icon: <IoIosSettings />,
    },
    isTeam && {
      key: "/team/players",
      label: <Link to="/team/players">Team Players</Link>,
      icon: <IoIosSettings />,
    },
    isTeam && {
      key: "/team/auction",
      label: <Link to="/team/auction">Team Auction</Link>,
      icon: <IoIosSettings />,
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
