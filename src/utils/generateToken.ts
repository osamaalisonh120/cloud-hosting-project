import { IJWTpaylods } from "./types";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';

// بيولد الي توكن 
export function generateJwt(jwtpaylods: IJWTpaylods): string {
  const privateKey = process.env.JWT_SECRET as string;
  const token = jwt.sign(jwtpaylods, privateKey, {
    expiresIn: "30d"
  })
  return token
}
export function setCookie(jwtpaylodsRegister: IJWTpaylods) {
  const token = generateJwt(jwtpaylodsRegister)
  const Cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    path: "/",
    maxAge: 60 * 60 * 24 * 30

  })
  return Cookie
}