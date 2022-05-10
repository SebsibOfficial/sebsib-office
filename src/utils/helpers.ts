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
  iat: number,
  email?: string,
}

var def:Token = {
  _id: '',
  org: '',
  org_name: '',
  role: '',
  exp: 0,
  iat: 0
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

export function translateIds (from: "ID" | "TEXT", inp: string) {
  if (from == 'ID') {
    switch (inp) {
      case "624558d1a263f17689cdc5bc":
        return "TEXT";
      case "624558d1a263f17689cdc5bd":
        return "CHOICE";
      case "624558d1a263f17689cdc5be":
        return "MULTI-SELECT";
      case "623cc24a8b7ab06011bd1e5f":
        return "MEMBER";
      case "623cc24a8b7ab06011bd1e60":
        return "OWNER";
      case "623cc24a8b7ab06011bd1e61":
        return "ADMIN";
      case "623cc24a8b7ab06011bd1e62":
        return "SUPER";
      case "623d73a051e8bcb894b3f7df":
        return "FREE TRAIL";
      case "623d73a051e8bcb894b3f7e0":
        return "UNLIMITED";      
      default:
        return false;
    }
  } else {
    switch (inp) {
      case "TEXT":
        return "624558d1a263f17689cdc5bc";
      case "CHOICE":
        return "624558d1a263f17689cdc5bd";
      case "MULTI-SELECT":
        return "624558d1a263f17689cdc5be";
      case "MEMBER":
        return "623cc24a8b7ab06011bd1e5f";
      case "OWNER":
        return "623cc24a8b7ab06011bd1e60";
      case "ADMIN":
        return "623cc24a8b7ab06011bd1e61";
      case "SUPER":
        return "623cc24a8b7ab06011bd1e62";
      case "FREE TRAIL":
        return "623d73a051e8bcb894b3f7df";
      case "UNLIMITED":
        return "623d73a051e8bcb894b3f7e0";      
      default:
        return false;
    }
  }
}