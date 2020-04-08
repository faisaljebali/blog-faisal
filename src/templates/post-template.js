import React,{useEffect} from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import Prism from "prismjs";
import * as moment from 'moment';
import SEO from "../components/seo"
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'




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

  let disqusConfig = {
    url: `${window.location.href}`,
    identifier: post.id,
    title: post.title,
  }

  return(<Layout>
    <SEO title={post.title} />
    <div>
        <h1>{post.title}</h1>
    </div>
    <h5><svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" height="20" viewBox="0 0 443.294 443.294" width="20"><path d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z"/><path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z"/></svg> Published : {moment(post.createdAt).format('Do MMMM YYYY')} | by @faisaljebali </h5>

    {tags.map(tag => (
      <span className={`tag tag-${tag}`} key={`tag-${tag}`}>
          #{tag}
      </span>
    ))}

    {(post.photo) ? <div className="post-img"><img src={post.photo.file.url} className="responsive" /></div> : '' }

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
              className="center-img responsive2"
            /></div>
          ),
        },
      })}
    </div>

    <div className="tags-footer">
    {tags.map(tag => (
      <span className={`tag tag-${tag}`} key={`tag-${tag}`}>
          #{tag}
      </span>
    ))}
    </div>

    <br />
    <CommentCount config={disqusConfig} placeholder={''} />
    <Disqus config={disqusConfig} />
  </Layout>)
}

export default PostTemplate