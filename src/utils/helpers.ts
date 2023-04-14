/* eslint-disable */
// @ts-ignore
import { createObjectID } from 'mongo-object-reader';
/* eslint-enable */
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import TYPES from './id-text.json';
import CryptoJS from "crypto-es";

interface Token {
  _id: string,
  org: string,
  org_name: string,
  role: string,
  exp: number,
  iat: number,
  shortOrgId: string,
  email?: string,
  pkgId: string
}

var def:Token = {
  _id: '',
  org: '',
  org_name: '',
  role: '',
  shortOrgId: '',
  exp: 0,
  iat: 0,
  pkgId: ''
}

export const validRoutes = [
  '/dashboard/',
  '/dashboard/projects',
  '/dashboard/projects/create-project',
  '/dashboard/projects/create-survey/*',
  '/dashboard/projects/view-survey/*',
  '/dashboard/members',
  '/dashboard/members/add-member',
  '/dashboard/members/edit-member/*',
  '/dashboard/settings',
  'login/',
]

export function generateId () {
  return hex(Date.now() / 1000) +
    ' '.repeat(16).replace(/./g, () => hex(Math.random() * 16))
}

function hex (value:any) {
  return Math.floor(value).toString(16)
}

export function decodeJWT(token:string) {
  try {
    return jwtDecode<Token>(token);
  } catch (error) {
    console.log(error);
    return def;
  }  
}

export function translateIds (from: "ID" | "TEXT", inp: string) {
  if (from == 'ID') {
    for (let index = 0; index < TYPES.length; index++) {
      const element = TYPES[index];
      if (element._id == inp){
        return element.text;
      }
    }
  } else {
    for (let index = 0; index < TYPES.length; index++) {
      const element = TYPES[index];
      if (element.text == inp){
        return element._id;
      }
    }
  }
}

export function encrypt (str: string) {
  const key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_PRIVATE_KEY);
  const iv = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_IV);

  var cipher = CryptoJS.AES.encrypt(str, key, {
    iv: iv,
    mode: CryptoJS.mode.CTR,
  });

  return cipher.toString();
}