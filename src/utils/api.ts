import axios from "axios";
import { FinalPayload } from "../screens/Create_Survey/Create_Survey";
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

export async function GetResponseList(surveyId: string):Promise<ResponseInterface>{
  try {
    var result = await axios.get('get/responselist/'+surveyId);
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

export async function GetSurveyListByProject(projId: string): Promise<ResponseInterface>{
  try {
    var result = await axios.get('get/surveylist/'+projId);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

export async function GetSurvey(id: string): Promise<ResponseInterface>{
  try {
    var result = await axios.get('get/survey/'+id);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

export async function GetRecentResponseList(orgId: string):Promise<ResponseInterface>{
  try {
    var result = await axios.get('get/recentresponse/'+orgId);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

// ######################################
export interface AddEditMemberInterface {
  name?: string;
  email: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  role: string
  password: string;
  projectsId: string[];
}

export interface EditSettingInterface {
  name: string,
  email: string,
  Opassword: string,
  Npassword: string
}

export async function EditMember(id: string, body: AddEditMemberInterface):Promise<ResponseInterface>{
  try {
    var result = await axios.patch('patch/editmember/'+id, body);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

export async function EditSettings(id: string, body: EditSettingInterface):Promise<ResponseInterface>{
  try {
    var result = await axios.patch('patch/editsettings/'+id, body);
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
  try {
    var result = await axios.delete('delete/member/'+id);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

export async function RemoveMemberFromProject(id: string, projId: string):Promise<ResponseInterface>{
  try {
    var result = await axios.patch('patch/removemember/'+projId+'/'+id);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

export async function AddMemberToProject(projId: string, body: string[]):Promise<ResponseInterface>{
  try {
    var result = await axios.patch('patch/addmembers/'+projId, {members: body});
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

export async function DeleteProject(id: string):Promise<ResponseInterface>{
  try {
    var result = await axios.delete('delete/project/'+id);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

export async function CreateProject(name: string, enums: string[]):Promise<ResponseInterface>{
  try {
    var result = await axios.post('post/createproject', {projectName: name, enumrators: enums});
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data.message}
  }
}

export async function CreateSurvey(pid: string, body: FinalPayload):Promise<ResponseInterface>{
  try {
    console.log(body);
    var result = await axios.post('post/createsurvey/'+pid, body);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data.message}
  }
}

export async function DeleteSurvey(pid: string, sid: string):Promise<ResponseInterface>{
  try {
    var result = await axios.delete('delete/survey/'+pid+'/'+sid);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

// NEW ENDPOINTS
interface SendRequestI {pkg:string, firstname:string, lastname:string, email:string, phone:string, orgname:string, longOrgId?:string, bank?:string | null, transno?:string | null, orgId?:string | null, subType?: string}
export async function SendRequest(type: "REGISTER" | "RENEWAL", body: SendRequestI):Promise<ResponseInterface>{
  try {
    var result = await axios.post('noauth/sendrequest/'+type, body);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

export async function GetOrgStatus(shortOrgId:string):Promise<ResponseInterface>{
  try {
    var result = await axios.get('noauth/orgstatus/'+shortOrgId);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

interface ChangePassI {initialpass:string | null, newpass:string, confirmpass:string}
export async function ChangePass(body: ChangePassI):Promise<ResponseInterface>{
  try {
    var result = await axios.patch('patch/changepass', body);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}

interface ResetPassI {email:string, shortOrgId:string}
export async function ResetPass(body: ResetPassI):Promise<ResponseInterface>{
  try {
    var result = await axios.patch('noauth/resetpass', body);
    return {code: result.status, data: result.data};
  } catch (error:any) {
    return {code: error.response.status, data: error.response.data}
  }
}