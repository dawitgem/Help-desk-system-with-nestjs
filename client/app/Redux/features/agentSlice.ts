import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Agent } from "../reducers";

interface agent {
  Id: string;
  FullName?: string | null;
  Email: string;
  agentName?: string | null;
  Image?: string | null;
  agentType: string;
  WorkingPhone?: string | null;
  MobilePhone?: string | null;
}
interface agentState {
  agent: agent | null;
  Loading: boolean;
  isAuth: boolean;
  error: string | null;
}
const initialState: agentState = {
  agent: null,
  isAuth: false,
  Loading: false,
  error: null,
};
const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    createAgent: (state, action: PayloadAction<agent>) => {
      state.Loading = false;
      state.agent = action.payload;
      state.isAuth = true;
      state.error = null;
    },
    AgentgetProfileStart: (state) => {
      state.Loading = true;
      state.isAuth = false;
    },
    AgentgetProfile: (state, action: PayloadAction<agent>) => {
      state.Loading = false;
      state.agent = action.payload;
      state.isAuth = true;
      state.error = null;
    },
    AgentgetProfileFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    AgentupdatePasswordRequest: (
      state,
      action: PayloadAction<{
        Id: string;
        currentPassword: string;
        newPassword: string;
      }>
    ) => {
      state.Loading = true;
    },

    AgentupdatePasswordSuccess: (state, action: PayloadAction<agent>) => {
      state.Loading = false;
      state.agent = action.payload;
      state.error = null;
    },

    AgentupdatePasswordFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.error = action.payload;
    },
    updateAgentFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.error = action.payload;
    },
    updateAgentSuccess: (
      state,
      action: PayloadAction<{
        Id: string;
        FullName: any;
        Image: any;
        WorkingPhone: any;
        MobilePhone: any;
      }>
    ) => {
      state.Loading = true;
      state.error = null;
    },

    AgentsignupSucess: (
      state,
      action: PayloadAction<{
        fullname: string;
        email: string;
        password: string;
      }>
    ) => {
      state.Loading = false;

      state.isAuth = true;
      state.error = null;
    },
    AgentsignUpFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    AgentsigninWithGoogleStart: (state) => {
      state.Loading = true;
      state.error = null;
    },

    AgentsignInWithGoogleSucess: (state) => {
      state.Loading = false;

      state.isAuth = true;
      state.error = null;
    },
    AgentsignInWithGoogleFaliuer: (state, action: PayloadAction<string>) => {
      state.Loading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    AgentsigninSucess: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.Loading = false;

      state.error = null;
      state.isAuth = true;
    },
    AgentsignInFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;

      state.error = action.payload;
      state.isAuth = false;
    },

    AgentLogoutSucess: (state) => {
      state.Loading = false;
      state.agent = null;
      state.isAuth = false;
      state.error = null;
    },
    AgentLogoutFaliure: (state, action: PayloadAction<string>) => {
      state.Loading = false;

      state.error = action.payload;
    },
  },
});

export const {
  AgentsignupSucess,
  AgentsigninSucess,
  createAgent,
  updateAgentSuccess,
  updateAgentFaliure,
  AgentupdatePasswordRequest,
  AgentupdatePasswordSuccess,
  AgentupdatePasswordFaliure,
  AgentsignInFaliure,
  AgentsignInWithGoogleFaliuer,
  AgentsignInWithGoogleSucess,
  AgentsignUpFaliure,
  AgentsigninWithGoogleStart,
  AgentgetProfile,
  AgentgetProfileStart,
  AgentgetProfileFaliure,
  AgentLogoutFaliure,
  AgentLogoutSucess,
} = agentSlice.actions;
export const selectAgent = (state: Agent) => {
  return state.Agent;
};
export default agentSlice.reducer;
