import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Khởi tạo store cho danh sách danh mục sản phẩm
const useCategoryStore = create(
  persist(
    (set) => ({
      categories: [
        {
          id: 1,
          name: "Quần áo",
        },
        {
          id: 2,
          name: "Giày dép",
        },
      ],

      // Hàm để thêm danh mục sản phẩm mới
      addCategory: (category) =>
      {
        console.log(category)
        set((state) => ({
          categories: [
            ...state.categories,
            { ...category, id: Math.ceil(Math.random() * 10000000) },
          ],
        }))
    },

      // Hàm để cập nhật danh mục sản phẩm
      updateCategory: (categoryId, updatedCategory) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id == categoryId
              ? { ...category, ...updatedCategory }
              : category
          ),
        })),

      // Hàm để xóa danh mục sản phẩm
      deleteCategory: (categoryId) =>
        set((state) => ({
          categories: state.categories.filter(
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

export default useCategoryStore;
