import axios from "axios";
export const getProfileApi = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
      {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      }
    );
    return response.data;
  } catch (e: any) {
    console.log(e);
    if (e.response.status === 401) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`
        );
        console.log(response);
        return response.data;
      } catch (e) {
        return null;
      }
    }
  }
};

export const SigninApi = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        Email: credentials.email,
        Password: credentials.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      }
    );
    return response.data;
  } catch (e: any) {
    throw new Error(`something went wrong!!! ${e.response.data.message}`);
  }
};

export const agentSigninApi = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/agent/signin`,
      {
        Email: credentials.email,
        Password: credentials.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  } catch (e: any) {
    throw new Error(`something went wrong!!! ${e.response.data.message}`);
  }
};

export const getTickets = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/ticket`
    );
    return response.data;
  } catch (e: any) {
    throw new Error(`something went wrong!!! ${e.response.data.message}`);
  }
};
