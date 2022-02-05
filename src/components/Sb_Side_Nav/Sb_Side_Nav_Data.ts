import {
  faClipboardList,
  faArchive,
  faQuestion,
  faUsers,
  faSignOutAlt,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface SideNavData {
  id: number;
  title: string;
  icon: IconProp;
  path: string | string[] ;
}

const navData1: SideNavData = {
  id: 1,
  title: "Dashboard",
  icon: faThLarge,
  path: "#"
};

const navData2: SideNavData = {
  id: 2,
  title: "Projects",
  icon: faArchive,
  path: "#"
};

const navData3: SideNavData = {
  id: 3,
  title: "Members",
  icon: faUsers,
  path: "#"
};

const navData4: SideNavData = {
  id: 4,
  title: "Log Out",
  icon: faSignOutAlt,
  path: "#"
};

const navData5: SideNavData = {
  id: 5,
  title: "Help",
  icon: faQuestion,
  path: "#" // no idea what goes here
};

export const NavData = [
  navData1,
  navData2,
  navData3,
  navData4,
  navData5,
];
