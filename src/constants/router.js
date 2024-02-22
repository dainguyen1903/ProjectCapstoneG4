import {
  UserOutlined,
  ProductOutlined,
  EditOutlined,
  HomeOutlined,
  DribbbleOutlined,
} from "@ant-design/icons";
import Home from "../page/home/home";
import ManageUser from "../page/manage-user";
import AddNewsForm from "../page/post/add";
import ManagePlayer from "../page/player/player";
import AddPlayerForm from "../page/player/add";
import DetailPlayer from "../page/player/detail";
import PostManage from "../page/post";
import DetailNews from "../page/post/detail";
import ChangePassword from "../page/changepass";
import Login from "../page/login/login";
import Register from "../page/register/register";
import ResetPass from "../page/resetpassword";
import Products from "../page/products";
import AddUserForm from "../page/manage-user/add";
import { ROLE } from "./role";
import ViewProfile from "../page/profile/view";
export const router = [
  {
    show: true,
    component: Home,
    icon: HomeOutlined,
    path: "/home",
    menuName: "Trang chủ",
    key: "/home",
  },
  {
    show: true,
    component: ManageUser,
    icon: UserOutlined,
    path: "/user/list",
    menuName: "Quản lí user",
    key: "/user",
    role: [ROLE.ADMIN],
  },
  {
    show: false,
    component: AddUserForm,
    path: "/user/add",
    key: "/user",
    role: [ROLE.ADMIN],
  },
  {
    show: false,
    component: AddUserForm,
    path: "/user/edit/:id",
    key: "/user",
    role: [ROLE.ADMIN],
  },
  {
    show: true,
    component: ManagePlayer,
    icon: DribbbleOutlined,
    path: "/player/list",
    menuName: "Quản lí cầu thủ",
    key: "/player",
    role: [ROLE.STAFF],
  },
  {
    show: false,
    component: AddPlayerForm,
    path: "/player/add",
    key: "/player",
    role: [ROLE.STAFF],
  },
  {
    show: false,
    component: AddPlayerForm,
    path: "/player/edit/:id",
    key: "/player",
    role: [ROLE.STAFF],
  },
  {
    show: false,
    component: DetailPlayer,
    path: "/player/detail/:id",
    key: "/player",
    role: [ROLE.STAFF],
  },
  {
    show: true,
    component: PostManage,
    icon: EditOutlined,
    path: "/news/list",
    menuName: "Quản lí bài viết",
    key: "/news",
    role: [ROLE.MAKERTER],

  },
  {
    show: false,
    component: AddNewsForm,
    path: "/news/add/",
    key: "/news",
    role: [ROLE.MAKERTER],
  },
  {
    show: false,
    component: AddNewsForm,
    path: "/news/edit/:id",
    key: "/news",
    role: [ROLE.MAKERTER],
  },
  {
    show: false,
    component: DetailNews,
    path: "/news/detail/:id",
    key: "/news",
    role: [ROLE.MAKERTER],
  },
  {
    show: true,
    component: Products,
    icon: ProductOutlined,
    path: "/product/list",
    menuName: "Quản lí sản phẩm",
    key: "/product",
    role: [ROLE.MAKERTER],
  },
  {
    show: false,
    component: ChangePassword,
    path: "/changepassword",
    key: "/changepass",
  },
  {
    show: false,
    component: Login,
    path: "/login",
    key: "/login",
    isProtected: false,
  },
  {
    show: false,
    component: Register,
    path: "/register",
    key: "/register",
    isProtected: false,
  },
  {
    show: false,
    component: ResetPass,
    path: "/password/reset",
    key: "/password/reset",
  },
  {
    show: false,
    component: ViewProfile,
    path: "/profile",
    key: "/profile",
  },
  {
    show: false,
    component: AddUserForm,
    path: "/profile/edit",
    key: "/profile",
  },
];
