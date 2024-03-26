import Cookies from "js-cookie";
// Set cookie
export const setCookie = (
  name: string,
  value: string,
  options?: Cookies.CookieAttributes
) => {
  Cookies.set(name, value, options);
  localStorage.setItem(name, value);
};
// Get cookie
export const getCookie = (name: string) => {
  return localStorage.getItem(name);
  return Cookies.get(name);
};
// Remove cookie
export const removeCookie = (
  name: string,
  options?: Cookies.CookieAttributes
) => {
  Cookies.remove(name, options);
  localStorage.removeItem(name);
};
