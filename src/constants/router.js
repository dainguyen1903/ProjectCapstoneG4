import {
  UserOutlined,
  ProductOutlined,
  EditOutlined,
  HomeOutlined,
  DribbbleOutlined,
  BorderOuterOutlined,
  MenuFoldOutlined
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
import ProductCategoryList from "../page/product-category/list";
import AddProductCategory from "../page/product-category/add";
import ProductList from "../page/products";
import AddProduct from "../page/products/add";
import AddMatchForm from "../page/match/add";
import ListMatch from "../page/match/list";
import NewsCategoryList from "../page/news-category/list";
import NewsCategoryAdd from "../page/news-category/add";
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
    component: NewsCategoryList,
    path: "/category-news/list",
    key: "/category-news",
    icon:MenuFoldOutlined,
    menuName:"Danh mục bài viết",
    role: [ROLE.MAKERTER],
  },
  {
    show: false,
    component: NewsCategoryAdd,
    path: "/category-news/add",
    key: "/category-news",
    role: [ROLE.MAKERTER],
  },
  {
    show: false,
    component: NewsCategoryAdd,
    path: "/category-news/edit/:id",
    key: "/category-news",
    role: [ROLE.MAKERTER],
  },
  {
    show: true,
    component: ProductList,
    icon: ProductOutlined,
    path: "/product/list",
    menuName: "Quản lí sản phẩm",
    key: "/product",
    role: [ROLE.MAKERTER],
  },
  {
    show: false,
    component: AddProduct,
    path: "/products/add",
    key: "/product",
    role: [ROLE.MAKERTER],
  },
  {
    show: false,
    component: AddProduct,
    path: "/products/edit/:id",
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
  {
    show: true,
    component: ProductCategoryList,
    path: "/category-product/list",
    key: "/category-product",
    icon:BorderOuterOutlined,
    menuName:"Danh mục sản phẩm",
    role: [ROLE.MAKERTER],
  },
  {
    show: false,
    component: AddProductCategory,
    path: "/category-product/add",
    key: "/category-product",
    role: [ROLE.MAKERTER],
  },
  {
    show: false,
    component: AddProductCategory,
    path: "/category-product/edit/:id",
    key: "/category-product",
    role: [ROLE.MAKERTER],
  },
  {
    show: false,
    component: AddMatchForm,
    path: "/match/edit/:id",
    key: "/match",
    role: [ROLE.MAKERTER],
  },
  {
    show: false,
    component: AddMatchForm,
    path: "/match/add",
    key: "/match",
    role: [ROLE.MAKERTER],
  },
  {
    show: true,
    component: ListMatch,
    icon: DribbbleOutlined,
    path: "/match/list",
    menuName: "Lịch thi đấu",
    key: "/match",
    role: [ROLE.MAKERTER]
    },
  
];
