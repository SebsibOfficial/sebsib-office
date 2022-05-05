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