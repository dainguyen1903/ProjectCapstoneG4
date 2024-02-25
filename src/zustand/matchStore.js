import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const useMatchStore = create(persist((set) => ({
    matches: [
      { id: 1,tournamentName:"C1", homeTeam: 'Team A', awayTeam: 'Team B', round: 1, dateTime: new Date(), stadium: 'Stadium X', matchStatus: '2', matchResult: '3-0' },
      { id: 2, tournamentName:"C1",homeTeam: 'Team A', awayTeam: 'Team D', round: 1, dateTime: new Date(), stadium: 'Stadium Y', matchStatus: '2', matchResult: '2-1' },
      { id: 3, tournamentName:"C1",homeTeam: 'Team A', awayTeam: 'Team F', round: 1, dateTime: new Date(), stadium: 'Stadium Z', matchStatus: '2', matchResult: '1-0' },
    ],
  
    addMatch: (match) =>
      set((state) => ({
        matches: [...state.matches, {...match,id:Math.random()*10000000 }],
      })),
  
    updateMatch: (matchId, newMatch) =>
      set((state) => ({
        matches: state.matches.map((match) =>
          match.id == matchId ? { ...match, ...newMatch } : match
        ),
      })),
  
    deleteMatch: (matchId) =>
      set((state) => ({
        matches: state.matches.filter((match) => match.id !== matchId),
      })),
  }),{
    name: 'match-storage', 
    storage: createJSONStorage(() => sessionStorage),
  }));
  
  export default useMatchStore;