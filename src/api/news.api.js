import api from ".";
const baseURLNews = "api/news/";
export const newsApi = {
  getListNews: () => {
    return api.get(baseURLNews + "list-news");
  },
  getDetailNews: (id) => {
    return api.get(baseURLNews + `news-detail/${id}`);
  },
  createrNews: (data) => {
    return api.post(baseURLNews + "create-news", data);
  },
  updateNews: (id, data) => {
    return api.put(baseURLNews + `update-news/${id}`, data);
  },
  deleteNews: (id) => {
    return api.delete(baseURLNews + `delete-news/${id}`);
  },
  searchNews: (params) => {
    return api.get(baseURLNews + "search-news", {
      params,
    });
  },
  searchNewsType: (params) => {
    return api.get(baseURLNews + "search-news-type", {
      params,
    });
  },
  createrNewsType: (data) => {
    return api.post(baseURLNews + "create-news-type", data);
  },
  updateNewsType: (id, data) => {
    return api.put(baseURLNews + `update-news-type/${id}`, data);
  },
  deleteNewsType: (id) => {
    return api.delete( `delete-news-type/${id}`);
  },
  getDetailNewsType: (id) => {
    return api.get(baseURLNews + `detail-news-type/${id}`);
  },
};
