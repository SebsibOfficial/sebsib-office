class ResponseInterface {
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

export async function GetMemberList(orgId: string):Promise<ResponseInterface>{
  await WAIT(3000);
  return {code: 404, data: "GetMemberList"}
}