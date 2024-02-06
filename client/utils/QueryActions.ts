import axios from "axios";
import { nanoid, customAlphabet } from "nanoid";
const Nanoid = customAlphabet("0123456789", 18);


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
    if (e.response.status === 401) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            headers: {
              "Content-Type": "application/json",
            },
    
            withCredentials: true,
          }
        );
        return response.data;
      } catch (e:any) {
        throw new Error(e.response.data.message)
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
     return response
  } catch (e: any) {
    throw new Error(`something went wrong!!! ${e.response.data.message}`);
  }
};

export const SignUpApi = async (credentials: {
  fullname:string
  email: string;
  password: string;
  image:string,
  MobilePhone:string
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      { Id: Nanoid(),
        FullName: credentials.fullname,
        Password: credentials.password,
        UserName: credentials.fullname,
        Email: credentials.email,
        Image: credentials.image,
        About: null,
        UserType: "Customer",
        WorkingPhone: null,
        MobilePhone: credentials.MobilePhone,
        CreatedDate: new Date(),
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
    return new Error(`something went wrong!!! ${e.response.data.message}`);
  }
};
export const signout =async()=>{
  try {
    const response=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {
      headers: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    }
  );
  return response.data;
} catch (e: any) {
  return new Error(`something went wrong!!! ${e.response.data.message}`);
}

}
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
    return response.data;
  } catch (e: any) {
    return new Error(`something went wrong!!! ${e.response.data.message}`);
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
export const getAgentTickets = async (userId:string,filtertype:string,offset:number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/ticket?userId=${userId}=filter=${filtertype}&offset=${offset}`
    );
    return response.data;
  } catch (e: any) {
    throw new Error(`something went wrong!!! ${e.response.data.message}`);
  }
};

export const SigninWithGoogleApi = async (User: {
  FullName: string;
  Email: string;
  Image: string;
  MobilePhone: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/googleAuth`,
      {
        Id: Nanoid(),
        FullName: User.FullName,
        Password: "",
        UserName: User.FullName,
        Email: User.Email,
        Image: User.Image,
        About: null,
        UserType: "Customer",
        WorkingPhone: null,
        MobilePhone: User.MobilePhone,
        CreatedDate: new Date(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
  
        withCredentials: true,
      }
    );
    return response.data;
    
  } catch (e:any) {
    throw new Error(`something went wrong!!! ${e.response.data.message}`);
    
  }
  
};

export const countTickets=async()=>{
   try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/ticket/count`,
            {
        headers: {
          "Content-Type": "application/json",
        },
  
        withCredentials: true,
      }
    );
    return response.data;
    
   } catch (error) {
     throw new Error("something went wrong!!!")
    
   }

}
export const getContacts=async()=>{
  try {const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/contact`,
          {
      headers: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    }
  );
  return response.data;
  
 } catch (error) {
   throw new Error("something went wrong!!!")
  
 }

}
export  const getcontact=async(id:string)=>{
  try {const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/contact/${id}`,
          {
      headers: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    }
  );
  console.log(response)
  return response.data;
  
 } catch (error) {
   throw new Error("something went wrong!!!")
  
 }

}
export const getContactTicket=async(id:string)=>{
  try {const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/contact/${id}/ticket`,
          {
      headers: {
        "Content-Type": "application/json",
      },

      withCredentials: true,
    }
  );
  console.log(response)
  return response.data;
  
 } catch (error) {
   throw new Error("something went wrong!!!")
  
 }

}