import cookies from "js-cookie"

const cookieConfig = {
  path: process.env.REACT_APP_COOKIE_PATH,
  domain: process.env.REACT_APP_COOKIE_DOMAIN,
  expires: +process.env.REACT_APP_COOKIE_EXPIRES,
}

export const cookiesKeys = {
  TOKEN: "token",
  MAIN_TOKEN: "mainToken",
  USER_ID: "userId",
  SITE: "site",
}

class Cookies {
  static get(key) {
    return JSON.parse(cookies.get(key) || null)
  }

  static set(key, value, config = cookieConfig) {
    return cookies.set(key, JSON.stringify(value), config)
  }

  static remove(key, config = cookieConfig) {
    cookies.remove(key, config)
  }

  static clear() {
    Object.values(cookiesKeys).forEach((key) => {
      Cookies.remove(key)
    })
  }
}

export default Cookies
