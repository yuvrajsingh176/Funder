import { dashboard, payment, withdraw, profile, logout } from "../assets/index";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: payment,
    link: "/create-campaign",
  },

  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },

];
