import api from ".";
const baseURLCategory = "api/category/";
export const categoryApi = {
  getListCategory: () => {
    return api.get(baseURLCategory + "list-category");
  },
  getDetailCategory: (id) => {
    return api.get(baseURLCategory + `category-detail/${id}`);
  },
  createrCategory: (data) => {
    return api.post(baseURLCategory + "create-category", data);
  },
  updateCategory: (id, data) => {
    return api.put(baseURLCategory + `update-category/${id}`, data);
  },
  deleteCategory: (id) => {
    return api.delete(baseURLCategory + `delete-category/${id}`);
  },
  searchCategory: (params) => {
    return api.post(baseURLCategory + "search-category", {
      params,
    });
  },
};
