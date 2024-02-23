import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
// Giả lập ID tự tăng cho mỗi tin tức mới
let newsIdCounter = 1;

const useNewsStore = create(persist((set) => ({
  news: [
    {   
        id:0,
        title:"Title 1",
        description:"Bai viet 1"
    }
  ],
  addNews: async (newNews) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    set((state) => ({
      news: [...state.news, { ...newNews, id: newsIdCounter++ }],
    }));
  },
  updateNews: async (id, updatedNews) => {
    console.log(updatedNews)
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    set((state) => ({
      news: state.news.map((newsItem) =>
        newsItem.id == id ? { ...newsItem, ...updatedNews } : newsItem
      ),
    }));
  },
  removeNews: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    set((state) => ({
      news: state.news.filter((newsItem) => newsItem.id !== id),
    }));
  },
  getNewsDetail: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    return set((state) => ({
      news: state.news.find((newsItem) => newsItem.id === id),
    }));
  },
}),{
  name: 'news-storage', 
  storage: createJSONStorage(() => sessionStorage),
}));

export default useNewsStore;