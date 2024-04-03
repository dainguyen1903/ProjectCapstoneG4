import api from ".";
const baseURLmatch = "api/fixtures/";
export const matchApi = {
  getListmatch: () => {
    return api.get(baseURLmatch + "list-fixtures");
  },
  getDetailmatch: (id) => {
    return api.get(baseURLmatch + `detail-fixtures/${id}`);
  },
  creatermatch: (data) => {
    return api.post(baseURLmatch + "create-fixtures", data);
  },
  updatematch: (id, data) => {
    return api.put(baseURLmatch + `update-fixtures/${id}`, data);
  },
  deletematch: (id) => {
    return api.delete(baseURLmatch + `delete-fixtures/${id}`);
  },
  searchmatch: (params) => {
    return api.get(baseURLmatch + "search-product", {
      params,
    });
  },
};
