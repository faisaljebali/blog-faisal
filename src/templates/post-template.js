import React,{useEffect} from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import Prism from "prismjs";
import * as moment from 'moment';



export const query = graphql`
  query($slug: String!) {
    post: contentfulPost(slug: { eq: $slug }) {
      title
      content {
        json
      }
      tag
      createdAt
      id
      photo {
        file {
          url
          fileName
          contentType
        }
      }
    }
  }
`


const PostTemplate = ({ data: { post } }) => {
  useEffect(() => {
    Prism.highlightAll()
  })
  let tags = post.tag.split(';');
  return(<Layout>
    <div>
        <h1>{post.title}</h1>
    </div>
    <h5>Published : {moment(post.createdAt).format('Do MMMM YYYY')} | by @faisaljebali </h5>
    {tags.map(tag => (
      <span className={`tag tag-${tag}`} key={`tag-${tag}`}>
          #{tag}
      </span>
    ))}
    <div>
      {documentToReactComponents(post.content.json, {
        renderNode: {
          [BLOCKS.HEADING_2]: (_node, children) => (
            <h2 style={{ color: "red" }}>{children}</h2>
          ),
          [BLOCKS.QUOTE]: (_node, children) => (
            <pre><code className="language language-javascript">{children}</code></pre>
          ),
          [BLOCKS.EMBEDDED_ASSET]: node => (
            <div className="center"><img
              src={`${node.data.target.fields.file["en-US"].url}?w=300&q=90`}
              alt={node.data.target.fields.title["en-US"]}
              className="center-img"
            /></div>
          ),
        },
      })}
    </div>
  </Layout>)
}

export default PostTemplate