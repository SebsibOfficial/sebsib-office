import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sb_Loader from "../../components/Sb_Loader";
import Sb_Member_Card from "../../components/Sb_Member_Card/Sb_Member_Card";
import Sb_Text from "../../components/Sb_Text/Sb_Text";
import { useAuth } from "../../states/AuthContext";
import { GetMemberList } from "../../utils/api";
import { decodeJWT } from "../../utils/helpers";
import './Members.css';

export default function Members () {
  let location = useLocation();
  let navigate = useNavigate();
  
  // Prevents routing from the URL
  useEffect(() => {
    if (!location.state){
       return navigate("/404");
    }
  },[location.state]);
  
  return (
    <>
      <Outlet/>
    </>
  )
}

type MemberItem = { _id:string, name:string, defaultSelectValue?:"UNSELECTED" | "SELECTED"};

export function Members_Landing () {
  let navigate = useNavigate();
  const {token, setAuthToken} = useAuth();
  const [members, setMembers] = useState<MemberItem[]>();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    // Populate Members
    GetMemberList(decodeJWT(token as string).org).then((res) => {
      if (res.code == 200){
        var mem_arr = res.data;
        var arr:MemberItem[] = [];
        mem_arr.forEach((member:any) => {
          if (member.roleId != '623cc24a8b7ab06011bd1e60')
            arr.push({_id: member._id, name: member.username})
        })
        setMembers(arr);
        setPageLoading(false);
      } else {
        console.info(res)
      }
    }).catch((err) => console.log(err))
  },[])

  return (
  pageLoading ? <Sb_Loader full/> :  
  <Col className="">
    <Row className="mb-4">
      <Col>
        <Button onClick={() => navigate('add-member', { state:true })}><Sb_Text font={16} color='--lightGrey'>Add Member</Sb_Text></Button>
      </Col>
    </Row>
    <Row>
      {
        members?.map((member:MemberItem) => 
        <Col md="3" key={member._id}>
          <Sb_Member_Card id={member._id} name={member.name} onDelete={(id) => console.log(id)} onClick={(id) => navigate('edit-member/'+id, { state:true })}/>
        </Col>)
      }
    </Row>
  </Col>
  )
}