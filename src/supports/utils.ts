import { TreeItemProps } from "@fluentui/react-northstar";
import { NavigationItem } from "../types";

export const convertNavigationItemToTreeItem = (
  item: NavigationItem
): TreeItemProps => ({
  id: item.key,
  title: item.content,
  items: item.items ? item.items.map(convertNavigationItemToTreeItem) : [],
});

export const convertTreeItemToNavigationItem = (
  item: TreeItemProps
): NavigationItem => ({
  key: item.id,
  content: item.title?.toString() || "",
  items: item.items
    ? item.items.map((i: any) => ({
        key: i.id,
        content: i.title,
      }))
    : [],
});
