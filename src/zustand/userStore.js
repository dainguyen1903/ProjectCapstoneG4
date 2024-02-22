import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

let userIdCounter = 1;

const useUserStore = create( persist((set) => ({
  users: [
    { id: 1, name: "Nguyễn Văn A", email: "nguyen.van.a@example.com" }
  ],
  // Thêm cầu thủ
  adduser: async (newuser) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      users: [...state.users, { ...newuser, id: Math.random()*10000000 }],
    }));
  },
  // Cập nhật thông tin cầu thủ
  updateuser: async (id, updateduser) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      users: state.users.map((user) =>
        user.id ==id ? { ...user, ...updateduser } : user
      ),
    }));
  },
  // Xóa cầu thủ
  removeuser: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
  // Lấy chi tiết cầu thủ
  getuserDetail: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return set((state) => ({
      userDetail: state.users.find((user) => user.id === id) || null,
    }));
  },
}),
{
  name: 'usser_store', 
  storage: createJSONStorage(() => sessionStorage), 
},
));

export default useUserStore;
