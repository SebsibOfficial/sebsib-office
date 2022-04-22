import axios from "axios";
export class ResponseInterface {
  constructor(code: number, data: any) {
    this.code = code;
    this.data = data;
  }
  code: number;
  data: any;
}

async function WAIT(time: any) {
  await new Promise((r) => setTimeout(r, time))
}

export async function login(email: string, password: string):Promise<ResponseInterface | void>{
  try {
    var result = await axios.post('auth/login', {email: email, password: password});
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

export async function GetMemberList(orgId: string):Promise<ResponseInterface>{
  //await WAIT(3000);
  try {
    var result = await axios.get('get/memberlist/'+orgId);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}