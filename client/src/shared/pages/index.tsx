import { ReactLazyPreload } from "@shared/react-lazy-preload";

export const SignInPageLazy = ReactLazyPreload(
  () => import("@modules/auth/pages/sign-in"),
);

export const SignUpPageLazy = ReactLazyPreload(
  () => import("@modules/auth/pages/sign-up"),
);

export const UserPageLazy = ReactLazyPreload(
  () => import("@modules/user/pages/user"),
);

export const ProductsPageLazy = ReactLazyPreload(
  () => import("@modules/product/pages/products"),
);

export const ProductPageLazy = ReactLazyPreload(
  () => import("@modules/product/pages/product"),
);
