import { MusicNoteSimple } from "@phosphor-icons/react";
import { Menu, Switch } from "antd";
import { useState } from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { getItem } from "../../utils";
import DashBoardTrack from "../../components/DashBoardTrack/DashBoardTrack";

const DashBoardPage = () => {
  const [keySelected, setKeySelected] = useState("dashboard");

  const items = [getItem("Track", "track", <MusicNoteSimple />)];
  const renderPage = (key) => {
    switch (key) {
      case "track":
        return <DashBoardTrack theme={theme} />;

      default:
        return <></>;
    }
  };

  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  };

  const handleMoonlightClick = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const [theme, setTheme] = useState("light");

  return (
    <>
      <div
        className="body"
        style={{
          display: "flex",
          overflowX: "hidden",
          backgroundColor: theme === "light" ? "#EBEEF2" : "#19222D",
        }}
      >
        <div className="aside fixed">
          <div
            className="header-aside"
            style={{
              border: "none",
              width: "100%",
              height: "100px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#232E3E",
              padding: "0 10%",
            }}
          >
            <div className="w-28">
              <img
                className="brightness-[100]"
                src="/images/logo/pdg-payment.png"
              />
            </div>
            <div style={{ padding: "20px" }}>
              <Switch
                onClick={handleMoonlightClick}
                checkedChildren={<FaRegMoon />}
                unCheckedChildren={<FaRegSun />}
                defaultChecked
              />
            </div>
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={"dashboard"}
            style={{
              width: 220,
              minHeight: "100vh",
              backgroundColor: "#232E3E",
              color: "#FFFFFF",
              border: "none",
            }}
            items={items}
            onClick={handleOnCLick}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div
            className="ml-[220px]"
            style={{ padding: "15px", height: "100vh" }}
          >
            {renderPage(keySelected)}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardPage;
