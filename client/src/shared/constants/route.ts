export const routePath = {
  getMain: () => "/",
  getUser: (id?: string) => `/user/${id ?? ""}`,
  getLogin: () => "/sign-in",
  getSignUp: () => "/sign-up",
  getProducts: () => `/products`,
  getProductDetails: ({
    id,
    section,
    filters,
  }: {
    id?: string | number;
    section?: string;
    filters?: string;
  }) => `/product/${id ?? ""}${filters ?? ""}${section ?? ""}`,
  getAddProduct: () => `/add-product`,
};
