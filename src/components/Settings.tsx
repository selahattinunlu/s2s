import { useState } from "react";
import { Header, Menu, Text, OpenOutsideIcon } from "@fluentui/react-northstar";
import SettingItem from "./SettingsItem";

const Settings = () => {
  const [activeSubMenu, setActiveSubMenu] = useState(0);

  const settingSteps = [
    {
      key: "settings-step-1",
      content: (
        <>
          <OpenOutsideIcon /> <Text content="Step 1" />
        </>
      ),
      onClick: () => setActiveSubMenu(0),
    },
    {
      key: "settings-step-2",
      content: (
        <>
          <OpenOutsideIcon /> <Text content="Step 2" />
        </>
      ),
      onClick: () => setActiveSubMenu(1),
    },
    {
      key: "settings-step-3",
      content: (
        <>
          <OpenOutsideIcon /> <Text content="Step 3" />
        </>
      ),
      onClick: () => setActiveSubMenu(2),
    },
  ];

  const adminItems = [
    {
      key: "licensing",
      content: (
        <>
          <OpenOutsideIcon /> <Text content="Licensing" />
        </>
      ),
      onClick: () => setActiveSubMenu(3),
    },
    {
      key: "administrators",
      content: (
        <>
          <OpenOutsideIcon /> <Text content="Administrators" />
        </>
      ),
      onClick: () => setActiveSubMenu(4),
    },
  ];

  return (
    <div className="settings_container">
      <div className="settings_menu_container">
        <Header as="h2" content="Settings" />
        <div className="divider_horizontal"></div>
        <div className="settings_item">
          <div className="settings_header">
            <div className="settings_menu_number">1</div>
            <Header as="h4" content="Settings" />
          </div>
          <Menu
            defaultActiveIndex={activeSubMenu}
            className="settings_menu_body"
            items={settingSteps}
            vertical
          />
        </div>
        <div className="settings_item">
          <div className="settings_header">
            <div className="settings_menu_number">2</div>
            <Header as="h4" content="Administration" />
          </div>
          <Menu className="settings_menu_body" items={adminItems} vertical />
        </div>
      </div>
      <div className="divider_vertical"></div>
      <div className="settings_menu_content">
        {activeSubMenu === 0 && <SettingItem />}
      </div>
    </div>
  );
};

export default Settings;
