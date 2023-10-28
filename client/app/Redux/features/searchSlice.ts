import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Ticket } from "./ticketSlice";
import { SearchType } from "../reducers";

interface search {
  Ticket: Ticket[];
  Article: string[];
}
interface searchState {
  search: search;
  Loading: boolean;
  error: string | null;
  recentlySearched: string[];
}
const initialState: searchState = {
  search: { Ticket: [], Article: [] },
  Loading: false,
  error: null,
  recentlySearched: [],
};

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchStart: (
      state,
      action: PayloadAction<{ type: string; query: string }>
    ) => {
      state.Loading = true;
      state.error = null;
      state.recentlySearched.push(action.payload.query);
      if (state.recentlySearched.length > 6) state.recentlySearched.pop();
    },
    searchSuccess: (
      state,
      action: PayloadAction<{ Ticket: Ticket[]; Article: string[] }>
    ) => {
      console.log(action.payload);
      state.search = action.payload;
      state.Loading = false;
      state.error = null;
    },
    searchFaliure: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      state.Loading = false;
      state.error = action.payload;
    },
    clearSearchStart: (state) => {},
    clearSearch: (state) => {
      state.recentlySearched = [];
      state.search = { Ticket: [], Article: [] };
      state.Loading = false;
      state.error = null;
    },
  },
});
export const {
  searchFaliure,
  searchStart,
  searchSuccess,
  clearSearch,
  clearSearchStart,
} = SearchSlice.actions;
export const selectSearch = (state: SearchType) => state.Search;
export default SearchSlice.reducer;
