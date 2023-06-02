import React, { useEffect, useMemo, useState } from "react";
import {
  Header,
  Flex,
  Input,
  FormDropdown,
  Tree,
  Button,
  TreeItemProps,
  TrashCanIcon,
} from "@fluentui/react-northstar";

import {
  SearchIcon,
  TriangleDownIcon,
  TriangleEndIcon,
} from "@fluentui/react-icons-northstar";
import { useApp } from "../contexts/AppContext";
import {
  convertNavigationItemToTreeItem,
  convertTreeItemToNavigationItem,
} from "../supports/utils";

const DEFAULT_FORM = {
  title: "",
  rootId: "",
};

const SettingItem = () => {
  const { navigationItems, updateNavigationItems, hideSettings } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [treeItems, setTreeItems] = useState<TreeItemProps[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState(DEFAULT_FORM);

  const titleRenderer = (
    Component: any,
    { content, expanded, open, hasSubtree, ...restProps }: any
  ) => {
    return (
      <Component expanded={expanded} hasSubtree={hasSubtree} {...restProps}>
        {expanded ? <TriangleDownIcon /> : <TriangleEndIcon />}

        {content}

        <Button
          loader="Quantify microchip"
          circular
          onClick={(e) => {
            e.stopPropagation();
            deleteItem(restProps.id);
          }}
          size="small"
          style={{ marginLeft: "10px" }}
        >
          <TrashCanIcon />
        </Button>
      </Component>
    );
  };

  const deleteItem = (id: string) => {
    let newTreeItems = [...treeItems];

    const findAndDelete = (items: TreeItemProps[]) => {
      items.forEach((item) => {
        if (item.id === id) {
          items.splice(items.indexOf(item), 1);
        }

        return findAndDelete((item.items as TreeItemProps[]) || []);
      });
    };

    findAndDelete(newTreeItems);
    setTreeItems(newTreeItems);
  };

  useEffect(() => {
    setTreeItems(navigationItems.map(convertNavigationItemToTreeItem));
  }, [navigationItems]);

  const filteredTreeItems = useMemo(() => {
    if (!searchQuery) {
      return treeItems;
    }

    return treeItems.filter((item) =>
      item.title?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, treeItems]);

  const handleSave = () => {
    updateNavigationItems(treeItems.map(convertTreeItemToNavigationItem));
  };

  const handleEntrySubmit = () => {
    const newTreeItems = [...treeItems];

    if (!form.rootId) {
      newTreeItems.push({
        id: `menuItem${treeItems.length + 1}`,
        title: form.title,
      });
    }

    const rootItem = newTreeItems.find((item) => item.title === form.rootId);
    rootItem?.items?.push({
      id: `menuItem_sub_${treeItems.length + 1}`,
      title: form.title,
    });

    setTreeItems(newTreeItems);
    setForm(DEFAULT_FORM);
    setShowForm(false);
  };

  return (
    <>
      <Header
        className="header"
        as="h2"
        content="Configure Navigation"
        description={{
          className: "header_descr",
          as: "span",
          content: "The Mega Menu can be configured here",
        }}
      />
      <Header
        className="header"
        as="h4"
        content="Add Navigation Entries"
        description={{
          className: "header_descr",
          as: "span",
          content:
            "Here's an example of how a section can be used to group inputs",
        }}
      />
      <Flex gap="gap.smaller" className="settings_entry_container">
        <Button
          content="+ Add Entry"
          primary
          onClick={() => setShowForm(!showForm)}
        />
        <Input
          className="settings_input"
          icon={<SearchIcon />}
          clearable
          value={searchQuery}
          onChange={(e: any) => setSearchQuery(e.target.value)}
          placeholder="Search"
        />
      </Flex>
      {showForm && (
        <Flex gap="gap.smaller" vAlign="end" style={{ marginBottom: 20 }}>
          <Flex gap="gap.smaller" vAlign="center" hAlign="center">
            <FormDropdown
              label={{
                content: `Root Menu`,
              }}
              value={form.rootId}
              onChange={(_, item) => {
                setForm({ ...form, rootId: item.value as string });
              }}
              items={treeItems.map((item) => item.title?.toString())}
              search={true}
            />
            <Input
              id="new-entry-name"
              label={{ content: "Title" }}
              placeholder=""
              value={form.title}
              onChange={(e: any) => setForm({ ...form, title: e.target.value })}
              autoFocus
            />
          </Flex>
          <Button
            content="Add"
            primary
            onClick={() => handleEntrySubmit()}
            disabled={form.title.length < 3}
          />
        </Flex>
      )}
      <Tree
        className="settings_content_tree"
        aria-label="Entry Tree"
        items={filteredTreeItems}
        renderItemTitle={titleRenderer}
      />
      <Flex className="settings_action_btns" gap="gap.smaller" hAlign="end">
        <Button content="Discard" secondary onClick={hideSettings} />
        <Button content="Save" onClick={handleSave} primary />
      </Flex>
    </>
  );
};

export default SettingItem;
