import { useMemo } from "react";
import ReactMegaMenu from "react-mega-menu";
import { NavigationItem } from "../types";

type menuItemProps = {
  label: string;
  key: string | number;
  items: React.ReactNode;
};

type styleConfigProps = {
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
  menuItemProps?: React.HTMLAttributes<HTMLLIElement>;
  menuItemSelectedProps?: React.HTMLAttributes<HTMLLIElement>;
  menuProps?: React.HTMLAttributes<HTMLUListElement>;
};

const styleConfig: styleConfigProps = {
  containerProps: { className: "mega_menu_container" },
  menuItemProps: { className: "mega_menu_item" },
  menuItemSelectedProps: { className: "mega_menu_active_item" },
  menuProps: { className: "mega_menu" },
};

interface IMenuItemProps {
  items: NavigationItem[];
}

const MenuItem = (props: IMenuItemProps) => {
  const subMenuItem = (
    <div className="menu_item">
      <div>
        <h3>My Career and Benefits</h3>
        <ul>
          <li>HRweb</li>
          <li>Benefits</li>
          <li>Learning Portal</li>
          <li>Internal Jobs</li>
          <li>Company Store</li>
          <li>Give</li>
        </ul>
      </div>
      <div>
        <h3>My Career and Benefits</h3>
        <ul>
          <li>HRweb</li>
          <li>Benefits</li>
          <li>Learning Portal</li>
          <li>Internal Jobs</li>
          <li>Company Store</li>
          <li>Give</li>
        </ul>
      </div>
      <div>
        <h3>Travel and Experience</h3>
        <ul>
          <li>Travel</li>
          <li>Expenses</li>
          <li>Payments</li>
          <li>US Immigration Travel</li>
        </ul>
      </div>
      <div>
        <h3>Travel and Experience</h3>
        <ul>
          <li>Travel</li>
          <li>Expenses</li>
          <li>Payments</li>
          <li>US Immigration Travel</li>
        </ul>
      </div>
    </div>
  );

  const items = useMemo(() => {
    if (props.items.length === 0) {
      return [];
    }

    return props.items.map((i) => ({
      label: i.content,
      key: i.key,
      items: subMenuItem,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.items]);

  return (
    <ReactMegaMenu
      tolerance={100}
      data={items as menuItemProps[]}
      styleConfig={styleConfig}
    />
  );
};

export default MenuItem;
