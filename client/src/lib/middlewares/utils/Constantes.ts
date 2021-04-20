export const API_URL: string = "http://localhost:8080/api/";

export const TOKEN: ITOKEN  = {
  symbol : 'TAK',
  decimal : 18,
  img: 'https://ipfs.io/ipfs/QmRLgx3aigZhbNQjZpY3gyErWijnH6AvXSS5dd2ddFgw2d'
}

export enum AlertType {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success",
}
