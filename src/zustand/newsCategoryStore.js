import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Khởi tạo store cho danh sách danh mục sản phẩm
const useNewsCategoryStore = create(
  persist(
    (set) => ({
      newsCategories: [
        {
          id: 1,
          name: "Báo thể thao",
        },
        {
          id: 2,
          name: "Báo sức khỏe",
        },
      ],

      // Hàm để thêm danh mục sản phẩm mới
      addNewsCategory: (category) =>
      {
        set((state) => ({
          newsCategories: [
            ...state.newsCategories,
            { ...category, id: Math.ceil(Math.random() * 10000000) },
          ],
        }))
    },

      // Hàm để cập nhật danh mục sản phẩm
      updateNewsCategory: (categoryId, updatedNewsCategory) =>
        set((state) => ({
          newsCategories: state.newsCategories.map((category) =>
            category.id == categoryId
              ? { ...category, ...updatedNewsCategory }
              : category
          ),
        })),

      // Hàm để xóa danh mục sản phẩm
      deleteNewsCategory: (categoryId) =>
        set((state) => ({
          newsCategories: state.newsCategories.filter(
            (category) => category.id !== categoryId
          ),
        })),
    }),
    {
      name: "product-category", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useNewsCategoryStore;
