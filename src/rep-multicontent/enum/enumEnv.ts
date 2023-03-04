require("dotenv").config()
export enum urlENVTOKEN {
    QA = "https://accounts.backstage.qa.globoi.com/token",
    PROD = "https://accounts.backstage.globoi.com/token"
  }
  console.log(process.env.CLIENT_ID_PROD)
  export const Client_credentials = {
    "QA" : {
      CLIENT_ID: process.env.CLIENT_ID_QA,
      CLIENT_SECRET: process.env.CLIENT_SECRET_QA
    },
    "PROD" : {
      CLIENT_ID: process.env.CLIENT_ID_PROD,
      CLIENT_SECRET: process.env.CLIENT_SECRET_PROD
    }
  }