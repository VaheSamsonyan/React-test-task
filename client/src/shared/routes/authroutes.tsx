import { createBrowserRouter, Navigate } from "react-router-dom";
import { routePath } from "@shared/constants/route";
import {
  SignUpPageLazy,
  SignInPageLazy,
  ProductsPageLazy,
  UserPageLazy,
  ProductPageLazy,
} from "@shared/pages";
import PageLayout from "@shared/layout";
import { ProtectedRoute, PublicRoute } from "@shared/routes/unauthroutes.tsx";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: routePath.getLogin(),
        element: <SignInPageLazy />,
      },
      {
        path: routePath.getSignUp(),
        element: <SignUpPageLazy />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: routePath.getMain(),
        element: <PageLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={routePath.getProducts()} replace />,
          },
          {
            path: routePath.getUser(),
            element: <UserPageLazy />,
          },
          {
            path: routePath.getProducts(),
            element: <ProductsPageLazy />,
          },
          {
            path: routePath.getAddProduct(),
            element: <ProductPageLazy />,
          },
          {
            path: routePath.getProductDetails({ id: ":id" }),
            element: <ProductPageLazy />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to={routePath.getLogin()} replace />,
  },
]);
