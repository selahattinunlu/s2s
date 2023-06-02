import { NavigationItem } from "../types";

export const DEFAULT_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    key: "menuItem1",
    content: "Menu Item 1",
    items: [
      {
        key: "menuItem1-sub-menu-1",
        content: "Sub Item 1 Item 1",
      },
      {
        key: "menuItem1-sub-menu-2",
        content: "Sub Item 1 Item 2",
      },
    ],
  },
  {
    key: "menuItem2",
    content: "Menu Item 2",
    items: [
      {
        key: "menuItem2-sub-menu-1",
        content: "Sub Item 2 Item 1",
      },
      {
        key: "menuItem2-sub-menu-2",
        content: "Sub Item 2 Item 2",
      },
    ],
  },
];
