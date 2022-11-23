import {createClient} from 'contentful';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Nav from '../Landing/Nav/Nav';
import { Link } from 'react-router-dom';
import Sb_Loader from '../../components/Sb_Loader';

interface BlogItem {
  id: string,
  title: string,
  thumbnail: string
}

export default function Blogs () {
  
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  
  const client = createClient({
    space: process.env.REACT_APP_SPACE_ID as string,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN as string
  });

  const linkGen = (id: string, title: string) => {
    var cleanTitle = title.replaceAll(" ","-");
    return id+"-"+cleanTitle;
  }

  useEffect(() => {
    try {
      var BLG:BlogItem[] = [];
      client.getEntries().then((APIblogs) => {
        APIblogs.items.forEach(b => {
          BLG.push({id: b.sys.id, title: (b.fields as any).title, thumbnail: 'https://'+(b.fields as any).thumbnail.fields.file.url});
        })
        setBlogs(BLG);
        setPageLoading(false);
      })
    } catch (error) {
      console.log(error)
    }
  }, [])
  
  return (
      <div>
          <Nav />
          <section className='blogs_sec'>
            <>
            {
              pageLoading ? <Sb_Loader full/> : 
              <>
                <p className='headline_blogs'>SEBSIB BLOGS</p>

                <Row>
                  {
                    blogs.map((blog, index) => (                  
                        <Col key={index} md="3" className='blog_card mt-4'>
                          <Link to={"/blogs/"+linkGen(blog.id, blog.title)}>
                            <div className='thumbnail_holder'>
                              <img src={blog.thumbnail} alt="" />
                            </div>
                            <div className='title_holder'>
                              <p>{blog.title}</p>
                            </div>
                          </Link>
                        </Col>
                    ))
                  }
                </Row>
              </>
            }
            </>
          </section>
        </div>
  )
}