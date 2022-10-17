import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { actionType } from "../../components/Sb_List_Item/Sb_List_Item";
import Sb_List from "../../components/Sb_List/Sb_List";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { decodeJWT, generateId } from "../../utils/helpers";
import { CreateProject, GetMemberList } from "../../utils/api";
import { NotifContext } from "../../states/NotifContext";
import { useAuth } from "../../states/AuthContext";
import Sb_Loader from "../../components/Sb_Loader";
import Sb_Alert from "../../components/Sb_ALert/Sb_Alert";

class CreateProjectPayload {
	constructor (id: string, pn: string, en: string[]) {
		this.id = id;
		this.projectName = pn;
		this.enums = en;
	}
	id: string;
	projectName: string;
	enums: string[];
}

interface Member {
  _id: string,
  name: string
}

export default function Create_Project () {
	let location = useLocation();
  let navigate = useNavigate();
  const Notif = useContext(NotifContext);
	const {token, setAuthToken} = useAuth();
  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);
  
	async function loadMembers() {
		// Get the members involved in the project
		var res = await GetMemberList(decodeJWT(token as string).org);
		if (res.code == 200) {
			var mem_arr_resp = res.data;
			var mem_arr:Member[] = [];
			mem_arr_resp.forEach((member:any) => {
				if (member.roleId != '623cc24a8b7ab06011bd1e60')
					mem_arr.push({_id: member._id, name: member.firstName+' '+member.lastName});
			})
			setMembers(mem_arr);
			setPageLoading(false);
		} else {
			console.log(res.data.message)
		}
	}

	useEffect(() => {
		loadMembers();
	}, [])

	/*############# STATES ############### */
	const [projectname, setProjectname] = useState("");
	const [members, setMembers] = useState<Member[]>([]);
	const [btnLoading, setBtnLoading] = useState(false);
	const [pageLoading, setPageLoading] = useState(true);

	let selectedMembers: string[] = [];
	/*------------- METHODS -------------- */
	function memberSelectHandler (id: string, actionType: actionType | undefined) {
    if (actionType === 'SELECTED')
      selectedMembers.push(id);
    else if (actionType === 'UNSELECTED')
      selectedMembers = selectedMembers.filter(memberID => memberID != id);
  }

	async function createProjectHandler () {
		setBtnLoading(true);
		console.log(selectedMembers);
		var res = await CreateProject(projectname, selectedMembers);
		if (res.code == 200){
			navigate('/dashboard/projects', {state: true});
		}
		else {
			setBtnLoading(false);
			console.log(res.data);
			Notif?.setNotification({code:res.code, type: "ERROR", message: res.data, id:1})
		}
	}

	return (
		pageLoading ? <Sb_Loader full/> :
		<Col>
			<Row className="mb-4" style={{'width':'30%'}}>
				<Sb_Alert>Enter the project name and select the enumrators to be involved.</Sb_Alert>
        		<Col>
					<Form.Group className="mb-3" controlId="LoginEmail">
						<Form.Label><Sb_Text font={16}>Project Name</Sb_Text></Form.Label>
						<Form.Control size="sm" type="text" placeholder="Name" onChange={(e) => setProjectname(e.target.value)}/>
					</Form.Group>
       			</Col>
      		</Row>
			<Row style={{'width':'30%'}}>
				<Col className="d-block">
					<Sb_Text font={16}>Enumerators</Sb_Text>
					<br />
					<Sb_List 
					items={members} 
					listType="MEMBER" compType='SELECT' onAction={(id, text, actionType) => memberSelectHandler(id, actionType)}/>
					<Button size="sm" className="mt-3" onClick={() => createProjectHandler()} disabled={btnLoading}>
						{
							btnLoading ? <Sb_Loader/> : <Sb_Text font={16} color="--lightGrey">Create Project</Sb_Text>
						}
					</Button>
				</Col>
			</Row>
		</Col>
	)
}