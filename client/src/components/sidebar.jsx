import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BarChart3,
  Box,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Home,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { cn } from "../lib/utils";

// Navigation items
const mainNavItems = [
  {
    title: "Dashboard",
    link: "/",
    icon: Home,
    end: true,
  },
  {
    title: "Products",
    link: "/products",
    icon: Package,
  },
  {
    title: "Orders",
    link: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Stock",
    link: "/stock",
    icon: Box,
  },
  {
    title: "Customers",
    link: "/customers",
    icon: Users,
  },
  {
    title: "Reports",
    link: "/reports",
    icon: BarChart3,
    submenu: [
      {
        title: "Sales Reports",
        link: "/reports/sales",
      },
      {
        title: "Inventory Reports",
        link: "/reports/inventory",
      },
      {
        title: "Customer Reports",
        link: "/reports/customers",
      },
    ],
  },
];

const adminNavItems = [
  {
    title: "User Management",
    link: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    link: "/settings",
    icon: Settings,
  },
];

const NavItem = ({ item, isCollapsed }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  if (item.submenu) {
    return (
      <div className="space-y-1">
        <button
          className={cn(
            "w-full justify-between flex items-center px-4 py-2 rounded-md hover:bg-accent",
            isSubmenuOpen && "bg-muted"
          )}
          onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}>
          <div className="flex items-center">
            <item.icon className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">{item.title}</span>}
          </div>
          {!isCollapsed &&
            (isSubmenuOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            ))}
        </button>
        {isSubmenuOpen && !isCollapsed && (
          <div className="ml-4 space-y-1 pl-4 border-l">
            {item.submenu.map((subItem) => (
              <NavLink
                key={subItem.title}
                to={subItem.link}
                className={({ isActive }) =>
                  cn(
                    "block px-4 py-2 rounded-md hover:bg-accent",
                    isActive && "bg-muted"
                  )
                }
                end>
                {subItem.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.link}
      className={({ isActive }) =>
        cn(
          "w-full justify-start flex items-center px-4 py-2 rounded-md hover:bg-accent",
          isActive && "bg-muted"
        )
      }
      end={item.end}>
      <item.icon className="h-4 w-4" />
      {!isCollapsed && <span className="ml-2">{item.title}</span>}
    </NavLink>
  );
};

const NavSection = ({ title, items, isCollapsed }) => (
  <div className="space-y-1 py-2">
    {title && !isCollapsed && (
      <h3 className="mb-2 px-4 text-sm font-semibold">{title}</h3>
    )}
    {items.map((item) => (
      <NavItem key={item.title} item={item} isCollapsed={isCollapsed} />
    ))}
  </div>
);

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isAuthenticated = true, role = "admin" } = useSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <aside
      className={cn(
        "shrink-0 border-r bg-background transition-all",
        isCollapsed ? "w-16" : "w-56"
      )}>
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 font-semibold",
                isActive && "text-primary"
              )
            }
            end>
            <ClipboardList className="h-6 w-6" />
            {!isCollapsed && <span>Inventory Pro</span>}
          </NavLink>
        </div>
        <div className="flex-1 overflow-y-auto px-2">
          <NavSection items={mainNavItems} isCollapsed={isCollapsed} />

          {role === "admin" && (
            <NavSection
              title="Admin"
              items={adminNavItems}
              isCollapsed={isCollapsed}
            />
          )}
        </div>
        <div className="border-t text-center">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-center outline-none hover:bg-accent rounded-xl p-3">
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
