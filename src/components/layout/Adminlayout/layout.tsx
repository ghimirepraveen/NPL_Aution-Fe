import * as React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { Layout, Grid } from "antd";

import AdminLayoutHeader from "./layoutHeader";
import AdminLayoutSider from "./layoutSlider";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { Content, Sider } = Layout;
  const screens = Grid.useBreakpoint();

  const openMenu = () => (!isMenuOpen ? setIsMenuOpen(true) : null);
  const closeMenu = () => (isMenuOpen ? setIsMenuOpen(false) : null);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {screens.lg && (
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            color: "#003893",
            left: 0,
            overflowX: "hidden",
            overflowY: "auto",
            transition: "all 0.3s",
            borderRight: "1px solid #e2e8f0",
          }}
        >
          <AdminLayoutSider closeMenu={closeMenu} />
        </Sider>
      )}
      <Layout
        style={{
          marginLeft: screens?.lg ? (collapsed ? 80 : 200) : 0,
          background: "#fafafa",
          transition: "all 0.3s",
        }}
      >
        <AdminLayoutHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          openMenu={openMenu}
        />

        <div
          onClick={closeMenu}
          style={{
            opacity: isMenuOpen ? 1 : 0,
            visibility: isMenuOpen ? "visible" : "hidden",
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 999,
            cursor: "pointer",
            background: "#97CBA9",
            transition: "all 0.3s",
          }}
        />

        <div
          style={{
            width: isMenuOpen ? 200 : 0,
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            overflow: "hidden",
            background: "#003893",
            transition: "all 0.3s",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              overflow: "auto",
              whiteSpace: "nowrap",
              color: "#97CBA9",
            }}
          >
            <AdminLayoutSider closeMenu={closeMenu} />
          </div>
        </div>

        <Content
          style={{
            marginTop: 80,
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <div
            style={{
              flex: 1,
              borderRadius: "0.625rem",
              border: "1px solid #003893",
              background: "#fff",
              padding: "1rem",
              boxShadow:
                "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            }}
          >
            <Outlet context={useOutletContext()} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
