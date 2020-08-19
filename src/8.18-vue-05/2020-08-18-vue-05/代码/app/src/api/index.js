import axios from "axios";

// 方便后期的维护和管理
const BASEURL = "/api";
const APIURL = {
  item: {
    getItems: BASEURL + "/items",
    login: BASEURL + "/login",
    regist: BASEURL + "/register"
  },
};

export async function getItems() {
  return await axios({
    url: APIURL.item.getItems,
  });
}

export async function login(req) {
  return await axios({
    method: "post",
    url: APIURL.item.login,
    data: req
  });
}


export async function regist(req) {
  return await axios({
    method: "post",
    url: APIURL.item.regist,
    data: req
  });
}
