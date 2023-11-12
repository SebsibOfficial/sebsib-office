import { Col, Row } from "react-bootstrap";
import Nav from "../Landing/Nav/Nav";
import ReactMarkdown from "react-markdown";
import "./Blog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sb_Loader from "../../components/Sb_Loader";
import {createClient} from 'contentful';

interface Blog {
  title: string,
  thumbnail: string,
  author: string,
  date: string,
  content: string,
}

export default function SingleBlog () {
  let params = useParams();
  const [blog, setBlog] = useState<Blog>();
  const [cp, setCp] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const client = createClient({
    space: process.env.REACT_APP_SPACE_ID as string,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN as string
  });

  function getId (id: string) {
    return id.split("-")[0];
  }

  useEffect(() => {
    try {
      client.getEntry(getId(params.id as string)).then((result) => {
        setBlog({
          title: (result.fields as any).title, 
          content: (result.fields as any).body, 
          thumbnail: 'https:'+(result.fields as any).thumbnail.fields.file.url, 
          date: (result.fields as any).blogDate, 
          author: (result.fields as any).author})
        setPageLoading(false);
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div>
      <Nav />
      <section className="blog_section">
        {
          pageLoading ? <Sb_Loader full/> :
          <Row className="blog_container">
            <Col md="1" className="side_col">
              <Row className="side_icon">
                <Col>
                  <FontAwesomeIcon icon={faLink} style={{'fontSize':'1.5em', 'cursor':'pointer'}} 
                  onClick={() => {navigator.clipboard.writeText(window.location.href); setCp(true); setTimeout(() => setCp(false), 2000)}}/>
                  <span className="link_cp" style={{'visibility': cp ? 'visible' : 'hidden'}}>
                    Link Copied
                  </span>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row className="headline_img" style={{'backgroundImage':'url('+blog?.thumbnail+')'}}>
                <Col>
                </Col>
              </Row>
              <Row className="headline_title">
                <Col>
                  <p>
                    {blog?.title}
                  </p>
                </Col>
              </Row>
              <Row className="author_sec">
                <Col>
                  <p style={{'textAlign':'left'}}>{blog?.date.slice(0, 10)}</p>
                </Col>
                <Col>
                  <p>By {blog?.author}</p>
                </Col>
              </Row>
              <Row className="content_sec">
                <Col>
                  <ReactMarkdown>
                    {
                      blog?.content as string
                    }
                  </ReactMarkdown>
                </Col>
              </Row>
            </Col>
          </Row>
        }
      </section>
    </div>
  )
}