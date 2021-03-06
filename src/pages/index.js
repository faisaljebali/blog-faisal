import React,{useEffect} from "react"
import { graphql,Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Post from "../components/post";
import ReactGA from 'react-ga';


const IndexPage = ({data}) => {

  useEffect(() => {
    ReactGA.initialize('UA-163122105-1');
    ReactGA.pageview('/');
  },[])

  return(
  <Layout>
    <SEO title="Home" />
    <div className="flex-post">

    {data.posts.nodes.map(post => (
      <div className="post-item" key={`lesson-${post.slug}`}>
        <Post post={post} />
      </div>
    ))}
  </div>

  </Layout>)
}

export const postsQuery = graphql`
  query {
    posts: allContentfulPost {
      totalCount
      nodes {
        title
        id
        tag
        shortText
        updatedAt
        createdAt
        content {
          json
        }
        slug
        photo {
          id
          file {
            url
            fileName
            contentType
          }
        }
      }
    }
  }
`


export default IndexPage
