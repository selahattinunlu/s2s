import { createContext, useContext, useEffect, useState } from "react";
import { NavigationItem } from "../types";
import { getNavigationItems, saveNavigationItems } from "../supports/storage";

interface IAppContext {
  navigationItems: NavigationItem[];
  activeRootMenu: number | null;
  showSettings: boolean;
  openSettings: () => void;
  hideSettings: () => void;
  changeActiveRootMenu: (index: number | null) => void;
  updateNavigationItems: (items: NavigationItem[]) => void;
}

interface AppProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

const useApp = () => useContext(AppContext);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [activeRootMenu, setActiveRootMenu] = useState<number | null>(null);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);

  // initialize navigation items
  useEffect(() => {
    setNavigationItems(getNavigationItems());
  }, []);

  const openSettings = () => {
    setActiveRootMenu(null);
    setShowSettings(true);
  };

  const hideSettings = () => {
    setShowSettings(false);
  };

  const changeActiveRootMenu = (index: number | null) => {
    hideSettings();
    setActiveRootMenu(index);
  };

  const updateNavigationItems = (items: NavigationItem[]) => {
    setNavigationItems(items);
    saveNavigationItems(items);
  };

  return (
    <AppContext.Provider
      value={{
        showSettings,
        openSettings,
        hideSettings,
        activeRootMenu,
        navigationItems,
        changeActiveRootMenu,
        updateNavigationItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useApp };
