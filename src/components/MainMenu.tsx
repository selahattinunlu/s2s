import {
  Menu,
  MenuIcon,
  MoreIcon,
  SettingsIcon,
  tabListBehavior,
} from "@fluentui/react-northstar";
import React, { useState, useEffect } from "react";
import { NavigationItem } from "../types";
import MenuItem from "./MenuItem";
import Settings from "./Settings";
import { useApp } from "../contexts/AppContext";

const MainMenu: React.FC = () => {
  const {
    navigationItems,
    activeRootMenu,
    changeActiveRootMenu,
    showSettings,
    openSettings,
  } = useApp();

  const [subNavItems, setSubNavItems] = useState<NavigationItem[]>([]);

  useEffect(() => {
    if (activeRootMenu === null) {
      setSubNavItems([]);
      return;
    }

    const activeNavItem = navigationItems[activeRootMenu];
    setSubNavItems(activeNavItem.items || []);
  }, [activeRootMenu, navigationItems]);

  return (
    <div className="menu_container">
      <Menu
        items={[
          {
            key: "menuIcon",
            content: <MenuIcon style={{ color: "purple" }} />,
          },
          ...(navigationItems || []).map((item, index) => ({
            ...item,
            onMouseOver: () => changeActiveRootMenu(index),
            onClick: () => null,
          })),
          {
            key: "moreIcon",
            content: <MoreIcon />,
          },
          {
            key: "settingsIcon",
            content: <SettingsIcon />,
            onClick: openSettings,
          },
        ]}
        className="main_menu"
        accessibility={tabListBehavior}
      />
      <MenuItem items={subNavItems} />

      {showSettings && <Settings />}
    </div>
  );
};

export default MainMenu;
