import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import useAuthStore from "./authStore";

let userIdCounter = 1;

const useUserStore = create( persist((set,get) => ({
  users: [
    [
      {
          "email": "thanhhv17@fptupdate.com.vn",
          "password": "121212121",
          "first_name": "mesi updae111",
          "last_name": "update",
          "address": "Ha tinh",
          "date_of_birth": "2024-02-28",
          "gender": "female",
          "role_id": "2",
          "image_url": "blob:http://localhost:5173/632b128e-09ce-467d-977d-4c336875329a",
          "id": 3937420.539477443,
          "image_name": "Ảnh chụp màn hình 2024-02-15 103151.png"
      },
      {
          "email": "thanh@gmail.com",
          "password": "654321",
          "first_name": "Hoàng 1",
          "last_name": "Thành",
          "address": "Ha tinh",
          "date_of_birth": "2024-02-27",
          "gender": "female",
          "role_id": "1",
          "image_name": "",
          "image_url": null,
          "id": 7973090.902045569
      },
      {
          "email": "staff@gmail.com",
          "password": "654321",
          "first_name": "staff",
          "last_name": "staff",
          "address": "Ha tinh",
          "date_of_birth": "2024-02-27",
          "gender": "female",
          "role_id": "2",
          "image_name": "Ảnh chụp màn hình 2024-02-22 133728.png",
          "image_url": "blob:http://localhost:5173/ef7bcb5e-b8ff-4018-a892-a402a2acecc0",
          "id": 4825657.262252014
      },
      {
          "email": "marker@gmail.com",
          "password": "123456",
          "first_name": "marjer",
          "last_name": "marker",
          "address": "Ha tinh",
          "date_of_birth": "2024-02-27",
          "gender": "male",
          "role_id": "3",
          "image_name": "Ảnh chụp màn hình 2024-02-22 133728.png",
          "image_url": "blob:http://localhost:5173/9f20195e-6f6c-4b43-9c66-207f733f0b65",
          "id": 1870279.4245893895
      },
      {
          "email": "thanh@gmail.com",
          "first_name": "Hoàng A2",
          "last_name": "Thành",
          "address": "Ha tinh",
          "date_of_birth": "2024-02-27",
          "gender": "female",
          "image_url": null,
          "image_name": "",
          "id": 7338786.226226517
      }
  ]
  ],
  // Thêm cầu thủ
  adduser: async (newuser) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      users: [...state.users, { ...newuser, id: Math.random()*10000000 }],
    }));
  },
  // Cập nhật thông tin cầu thủ
  updateuser: async (id, updateduser,profile=false) => {
    console.log(id,updateduser)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      users: state.users.map((user) =>
        user.id ==id ? { ...user, ...updateduser } : user
      ),
    }));
    const userUpdate = get().users.find(i => i.id == id);
    if(profile){
      useAuthStore.getState().setUser({ ...userUpdate, ...updateduser })
    }
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
