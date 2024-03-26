"use server";
import { loginRequest } from "../apiRequest";

const NEXT_PUBLIC_LOCAL_BASE_URL = process.env
  .NEXT_PUBLIC_METABOT_URL as string;

export const loginAction = async () => {
  //console.log(limitId)
  "use server";

  const headers = new Headers({
    //Authorization: ,
    "Content-Type": "application/json",
  });
};
