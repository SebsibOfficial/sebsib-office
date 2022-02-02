import {
  faClipboardList,
  faPlus,
  faQuestion,
  faShoppingCart,
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
  title: "dashboard",
  icon: faThLarge,
  path: ['/client/dashboard', '/user/dashboard']
};

const navData2: SideNavData = {
  id: 2,
  title: "create-survey",
  icon: faPlus,
  path: "/client/dashboard/create-survey"
};

const navData3: SideNavData = {
  id: 3,
  title: "your-surveys",
  icon: faClipboardList,
  path: "/client/dashboard/your-surveys"
};

const navData4: SideNavData = {
  id: 4,
  title: "survey-market",
  icon: faShoppingCart,
  path: "/client/dashboard/survey-market"
};

const navData5: SideNavData = {
  id: 5,
  title: "log-out",
  icon: faSignOutAlt,
  path: ["/client/sign-in", "/user/sign-in"]
};

const navData6: SideNavData = {
  id: 6,
  title: "help",
  icon: faQuestion,
  path: "#" // no idea what goes here
};

export const NavData = [
  navData1,
  navData2,
  navData3,
  navData4,
  navData5,
  navData6,
];
