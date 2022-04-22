/* eslint-disable */
// @ts-ignore
import { createObjectID } from 'mongo-object-reader';
/* eslint-enable */
import jwtDecode from 'jwt-decode';
import axios from 'axios';

interface Token {
  _id: string,
  org: string,
  org_name: string,
  role: string,
  exp: number,
  iat: number
}

var def:Token = {
  _id: '',
  org: '',
  org_name: '',
  role: '',
  exp: 0,
  iat: 0
}

export function generateId () {
  return createObjectID();
}

export function decodeJWT(token:string) {
  try {
    return jwtDecode<Token>(token);
  } catch (error) {
    console.log(error);
    return def;
  }  
}