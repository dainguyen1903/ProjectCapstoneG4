import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

// Giả lập ID tự tăng cho mỗi cầu thủ mới
let playerIdCounter = 1;

const usePlayerStore = create( persist((set) => ({
  players: [
    {
      name: "Tên Cầu Thủ",
      date_of_birth: "1990-01-01",
      height: 180,
      weight: 75,
      nationality: "Việt Nam",
      position: "Tiền đạo",
      bio: "Tiểu Sử",
      join_date: "2020-01-01",
      id:0
    },
  ],
  // Thêm cầu thủ
  addPlayer: async (newPlayer) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      players: [...state.players, { ...newPlayer, id: Math.random()*10000000 }],
    }));
  },
  // Cập nhật thông tin cầu thủ
  updatePlayer: async (id, updatedPlayer) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      players: state.players.map((player) =>
        player.id ==id ? { ...player, ...updatedPlayer } : player
      ),
    }));
  },
  // Xóa cầu thủ
  removePlayer: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      players: state.players.filter((player) => player.id !== id),
    }));
  },
  // Lấy chi tiết cầu thủ
  getPlayerDetail: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return set((state) => ({
      playerDetail: state.players.find((player) => player.id === id) || null,
    }));
  },
}),
{
  name: 'food-storage', // name of the item in the storage (must be unique)
  storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
},
));

export default usePlayerStore;
