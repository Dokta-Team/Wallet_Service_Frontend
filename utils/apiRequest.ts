import { setToken, useAxios } from "@/utils/axiosInstance";
// import { accessToken, getValidToken } from "./tokenClient";
import { redirect } from "next/navigation";
import { setCookie } from "./cookieData";
import { TOKEN_NAME, USER_DATA } from "@/config/config";
// setToken(getValidToken())
export const createUser = async (url: string, formData: any) => {
  try {
    const response = await useAxios.post(`/${url}`, formData);
    const { data, status } = response;
    if (status === 200 && data.success === false) {
      return {
        data: {},
        status,
        success: data.success,
        message: data?.message,
      };
    } else if (status === 200 && data.success === true) {
      return {
        data: data.payload,
        status,
        success: data.success,
        message: data?.message,
      };
    }
  } catch (error: any) {
    return {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || error?.message,
      success: false,
    };
  }
};

export const userDashboard = async (url: string) => {
  try {
    const response = await useAxios.get(`/${url}`);
    const { data, status } = response;
    if (status !== 200 && data.success === false) {
      return {
        data: {},
        status,
        success: data.success,
        message: data?.message,
      };
    } else if (status === 200 && data.success === true) {
      return {
        data: data.payload,
        status,
        success: data.success,
        message: data?.message,
      };
    }
  } catch (error: any) {
    return {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || error?.message,
      success: false,
    };
  }
};

export const loginRequest = async (url: string, formData: any) => {
  try {
    const response = await useAxios.post(`/${url}`, formData);
    const { data, status } = response;
    if (status !== 200) {
      return {
        data: {},
        status,
        success: data.success,
        message: data?.message,
      };
    } else if (status === 200 && data.success === true) {
      await setToken(data.token);
      await setCookie(TOKEN_NAME, data.token);
      await localStorage.setItem(USER_DATA, JSON.stringify(data.payload));
      return {
        data: data.payload,
        status,
        success: data.success,
        message: data?.message,
        token: data.token || null,
      };
    }
  } catch (error: any) {
    return {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || error?.message,
      success: false,
    };
  }
};

export const postRequest = async (url: string, formData: any) => {
  try {
    const response = await useAxios.post(`/${url}`, formData);
    const { data, status } = response;
    if (status !== 200) {
      return {
        data: {},
        status,
        success: data.success,
        message: data?.message,
      };
    } else if (status === 200 && data.success === true) {
      return {
        data: data.payload,
        status,
        success: data.success,
        message: data?.message,
        token: data.token || null,
      };
    }
  } catch (error: any) {
    return {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || error?.message,
      success: false,
    };
  }
};

export const getRequest = async (url: string) => {
  try {
    const response = await useAxios.get(`/${url}`);
    const { data, status } = response;
    if (status !== 200 && data.success === false) {
      return {
        data: null,
        status,
        success: data.success,
        message: data?.message,
      };
    } else if (status === 200 && data.success === true) {
      return {
        data: data.payload,
        count: data.count,
        status,
        success: data.success,
        message: data?.message,
      };
    } else {
      return {
        data: data?.payload || {},
        count: data?.count || 0,
        status,
        success: data.success,
        message: data?.message,
      };
    }
  } catch (error: any) {
    return {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || error?.message,
      success: false,
    };
  }
};
export const getChartRequest = async (url: string) => {
  try {
    const response = await useAxios.get(`/${url}`);
    const { data, status } = response;
    if (status !== 200 && data.success === false) {
      return {
        data: null,
        status,
        success: data.success,
        message: data?.message,
      };
    } else if (status === 200 && data.success === true) {
      return {
        data: data.payload,
        count: data.count,
        status,
        success: data.success,
        message: data?.message,
      };
    } else {
      return {
        data: data?.payload || {},
        count: data?.count || 0,
        status,
        success: data.success,
        message: data?.message,
      };
    }
  } catch (error: any) {
    return {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || error?.message,
      success: false,
    };
  }
};

export const putRequest = async (url: string, formData: any) => {
  try {
    const response = await useAxios.put(`/${url}`, formData);
    const { data, status } = response;
    if (status !== 200 && data.success === false) {
      return {
        data: {},
        status,
        success: data.success,
        message: data?.message,
      };
    } else if (status === 200 && data.success === true) {
      return {
        data: data.payload,
        status,
        success: data.success,
        message: data?.message,
      };
    }
  } catch (error: any) {
    return {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || error?.message,
      success: false,
    };
  }
};
