import { NavLink } from "react-router";
import type { LucideIcon } from "lucide-react";
import { Home, Logs, ChartLine, Settings } from "lucide-react";
import AddSession from "./AddSession";
import Rectangle from "../assets/Rect.svg";

type NavItem = {
  icon: LucideIcon;
  path: string;
};

const navLinks: NavItem[] = [
  { icon: Home, path: "/" },
  { icon: Logs, path: "/sessions" },
  { icon: ChartLine, path: "/analytics" },
  { icon: Settings, path: "/settings" },
];

export default function Navbar() {
  // Split links into two halves
  const leftLinks = navLinks.slice(0, 2);
  const rightLinks = navLinks.slice(2);

  const renderLink = (link: NavItem) => (
    <li key={link.path}>
      <NavLink
        to={link.path}
        className="relative flex items-center justify-center"
      >
        {({ isActive }) => (
          <>
            <link.icon size={22} />
            {isActive && (
              <span className="absolute -bottom-2 w-1.5 h-1.5 bg-white rounded-full" />
            )}
          </>
        )}
      </NavLink>
    </li>
  );

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-4/5">
      <AddSession />
      <img className="mx-auto" src={Rectangle} alt="" />
      <ul className="flex items-center justify-between bg-primary text-white p-5 rounded-full shadow-lg">
        {leftLinks.map(renderLink)}

        {/* The Centerpiece */}
        <li className="size-[22px]"></li>

        {rightLinks.map(renderLink)}
      </ul>
    </div>
  );
}
