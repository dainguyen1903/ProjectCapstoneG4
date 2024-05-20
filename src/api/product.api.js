import api from ".";
const baseURLProduct = "api/product/";
export const productApi = {
  getListProduct: () => {
    return api.get(baseURLProduct + "list-product");
  },
  getDetailProduct: (id) => {
    return api.get(baseURLProduct + `details-product/${id}`);
  },
  createrProduct: (data) => {
    return api.post(baseURLProduct + "create-product", data);
  },
  updateProduct: (id, data) => {
    return api.put(baseURLProduct + `update-product/${id}`, data);
  },
  deleteProduct: (id) => {
    return api.delete(baseURLProduct + `delete-product/${id}`);
  },
  searchProduct: (params) => {
    return api.get(baseURLProduct + "search-product", {
      params,
    });
  },
  top5Prouct: (params={}) => {
    return api.get("api/statistictop-5-product-sales" , {
      params,
    });
  },
  getQuantityProduct: (params={}) => {
    return api.get("api/statistic/statistic-quantity-product" , {
      params,
    });
  },
  getBuyer: (params={}) => {
    return api.get("api/statistic/statistic-buyer" , {
      params,
    });
  },
  getDoanhthu: (params={}) => {
    return api.get("api/statistic/statistic-revenue" , {
      params,
    });
  },
};
