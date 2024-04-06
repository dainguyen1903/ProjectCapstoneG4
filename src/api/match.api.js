import api from ".";
const baseURLmatch = "api/fixtures/";
export const matchApi = {
  getListmatch: () => {
    return api.get(baseURLmatch + "list-fixtures");
  },
};
