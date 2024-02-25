import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Khởi tạo store cho danh sách danh mục sản phẩm
const useProductStore = create(
  persist(
    (set) => ({
      products: [
        {
          id: 1,
          name: "Quần Jean",
          price:1000,
          discount:10,
          size:30,
          description:"ok",
          category_id:1,
          category_name:"Quần áo",
          image_url:null,
          image_name:null

        },
      
      ],

      // Hàm để thêm danh mục sản phẩm mới
      addProduct: (Product) =>
      {
        console.log(Product)
        set((state) => ({
          products: [
            ...state.products,
            { ...Product, id: Math.ceil(Math.random() * 10000000) },
          ],
        }))
    },

      // Hàm để cập nhật danh mục sản phẩm
      updateProduct: (ProductId, updatedProduct) =>
        set((state) => ({
          products: state.products.map((Product) =>
            Product.id == ProductId
              ? { ...Product, ...updatedProduct }
              : Product
          ),
        })),

      // Hàm để xóa danh mục sản phẩm
      deleteProduct: (ProductId) =>
        set((state) => ({
          products: state.products.filter(
            (Product) => Product.id !== ProductId
          ),
        })),
    }),
    {
      name: "product-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useProductStore;
