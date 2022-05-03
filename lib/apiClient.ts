import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://opendata.resas-portal.go.jp/api/v1/",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "rN4yjo3ctLMTZNtY00KvUkyyChNKvORhNPBtmDp0",
  },
});
