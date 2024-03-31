import { TOKEN_NAME } from "@/config/config";
import { getRequest } from "@/utils/apiRequest";
import { getCookie } from "@/utils/cookieData";
import { setToken } from "@/utils/axiosInstance";

export async function getUserWallet() {
  try {
    const token = await getCookie(TOKEN_NAME);
    await setToken(token);
    const response: any = await getRequest("wallet");
    if (response && response.success === true) {
      return response.data.wallet.balance;
    } else {
      throw new Error(response?.message || "Something went wrong");
    }
  } catch (error) {
    throw error;
  }
}
