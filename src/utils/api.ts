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
  try {
    var result = await axios.get('get/memberlist/'+orgId);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

export async function GetMember(id: string):Promise<ResponseInterface>{
  try {
    var result = await axios.get('get/member/'+id);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

export async function GetProjectList(orgId: string):Promise<ResponseInterface>{
  try {
    var result = await axios.get('get/projectlist/'+orgId);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

export async function GetSurveyListByOrg(orgId: string): Promise<ResponseInterface>{
  var res_survey:any[] = [];
  var res_code:number = 200;
  try {
    var result = await GetProjectList(orgId);
    let survey_arr:any = [];
    for (let index = 0; index < result.data.length; index++) {
      const element = result.data[index];
      var survey_result = await axios.get('get/surveylist/'+element._id);
      if (survey_result.data.code != 200) res_code = result.code;
      survey_arr = survey_arr.concat(survey_result.data);
    }
    return {code: res_code, data: survey_arr}
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

// ######################################
export interface AddEditMemberInterface {
  name?: string;
  email: string;
  username: string;
  password: string;
  projectsId: string[];
}

export async function EditMember(id: string, body: AddEditMemberInterface):Promise<ResponseInterface>{
  try {
    var result = await axios.patch('patch/editmember/'+id, body);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

export async function AddMember(body: AddEditMemberInterface):Promise<ResponseInterface>{
  try {
    var result = await axios.post('post/createmember', body);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data.message}
  }
}

export async function DeleteMember(id: string):Promise<ResponseInterface>{
  await WAIT(1000);
  try {
    var result = await axios.delete('delete/member/'+id);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}