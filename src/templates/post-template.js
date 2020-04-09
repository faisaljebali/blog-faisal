import React,{useEffect} from "react"
import { graphql,Link } from "gatsby"
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import Prism from "prismjs";
import * as moment from 'moment';
import SEO from "../components/seo"
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import ReactGA from 'react-ga';



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
      slug
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
        Prism.highlightAll();
        ReactGA.initialize('UA-163122105-1');
        ReactGA.pageview(`/${post.slug}`);
    },[])

    let tags = post.tag.split(';');

    let disqusConfig = {
        url: `https://www.faisaljebali.com/${post.slug}`,
        identifier: post.id,
        title: post.title,
    }

    return(<Layout>
        <SEO title={post.title} />

        <div>
            <h1>{post.title}</h1>
        </div>

        <h5><svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" height="20" viewBox="0 0 443.294 443.294" width="20"><path d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z"/><path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z"/></svg> Published : {moment(post.createdAt).format('Do MMMM YYYY')} | by @faisaljebali </h5>

        <div className="tags-item-list">
            {tags.map(tag => (
            <span className={`tag tag-${tag}`} key={`tag-${tag}`}>
                #{tag}
            </span>
            ))}
        </div>
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
        <Link to={'/'} className="a-return-home">
        <svg xmlns="http://www.w3.org/2000/svg" className="arrow-back" version="1.1" x="0px" y="0px" viewBox="0 0 512.001 512.001" xlink="http://www.w3.org/1999/xlink">
        <g>
            <g>
		<path d="M384.834,180.699c-0.698,0-348.733,0-348.733,0l73.326-82.187c4.755-5.33,4.289-13.505-1.041-18.26    c-5.328-4.754-13.505-4.29-18.26,1.041l-82.582,92.56c-10.059,11.278-10.058,28.282,0.001,39.557l82.582,92.561    c2.556,2.865,6.097,4.323,9.654,4.323c3.064,0,6.139-1.083,8.606-3.282c5.33-4.755,5.795-12.93,1.041-18.26l-73.326-82.188    c0,0,348.034,0,348.733,0c55.858,0,101.3,45.444,101.3,101.3s-45.443,101.3-101.3,101.3h-61.58    c-7.143,0-12.933,5.791-12.933,12.933c0,7.142,5.79,12.933,12.933,12.933h61.58c70.12,0,127.166-57.046,127.166-127.166    C512,237.745,454.954,180.699,384.834,180.699z"/>
                </g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            </svg>
            Home page
        </Link>
        <br />
        <CommentCount config={disqusConfig} placeholder={''} />
        <Disqus config={disqusConfig} />
    </Layout>)
}

export default PostTemplate