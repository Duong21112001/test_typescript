import {v4 as uuidv4} from "uuid"
// import Admin from "../Page/Admin";
import Landing from "../Page/Landing";
import Login from "../Page/Login";
import Product from "../Page/Admin/Components/Product";
// import Admin from "../Page/Admin";
import AddProduct from "../Page/Admin/Components/AddProduct";
import User from "../Page/Admin/Components/User";
import AddUser from "../Page/Admin/Components/AddUser";
import UserBill from "../Page/Admin/Components/UserBill";
import Sales from "../Page/Admin/Components/Sales";
export interface Route {
    id:string,
  path: string;
  element: React.ComponentType<any>;
}

export const publicRouter: Route[] = [
  {
    id:uuidv4(),
    path: "/",
    element: Login,
  },
  {
    id:uuidv4(),

    path: "/landing",
    element: Landing,

  },
];

export const privateRouter: Route[] = [
  {
    id:uuidv4(),
    path: "/admin/product",
    element: Product,
  },
  {
    id:uuidv4(),
    path: "/admin/add-product",
    element: AddProduct,
  },
  {
    id:uuidv4(),
    path: "/admin/user",
    element: User,
  },
  {
    id:uuidv4(),
    path: "/admin/adduser",
    element: AddUser,
  },
  {
    id:uuidv4(),
    path: "/admin/user-bill",
    element: UserBill,
  },
  {
    id:uuidv4(),
    path: "/admin/sales",
    element: Sales,
  },
];
