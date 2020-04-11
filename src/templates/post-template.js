import React,{useEffect} from "react"
import { graphql,Link } from "gatsby"
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import Prism from "prismjs";
import * as moment from 'moment';
import SEOPOST from "../components/seopost"
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import ReactGA from 'react-ga';
import BackToTop from "react-back-to-top-button";



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
        <SEOPOST title={post.title} img={post.photo.file.url} urlpost={`https://www.faisaljebali.com/${post.slug}`} />
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

        <div className="post-detail">
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
                src={`${node.data.target.fields.file["en-US"].url}?w=450&q=90`}
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
        <BackToTop
        showOnScrollUp
        showAt={100}
        speed={1500}
        easing="easeInOutQuint"
        >
            <span className="scrolltop">
                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" xlink="http://www.w3.org/1999/xlink">
                <g>
                    <g>
                        <g>
                            <path d="M445.583,245.125l-95.688-63.792c-20.896-13.958-49.563-13.958-70.458,0l-2.104,1.406V42.667     C277.333,19.135,258.198,0,234.667,0S192,19.135,192,42.667v285.479c0,5.375-3.542,8.135-5.063,9.073     c-1.531,0.948-5.615,2.875-10.375,0.469l-68.5-34.25c-6.24-3.125-13.229-4.771-20.208-4.771     c-24.917,0-45.188,20.271-45.188,45.188V352c0,2.958,1.229,5.781,3.385,7.802l123.115,114.906     C194.938,498.75,228.542,512,263.781,512h98.885c58.813,0,106.667-47.854,106.667-106.667V289.5     C469.333,271.625,460.458,255.042,445.583,245.125z M448,405.333c0,47.052-38.281,85.333-85.333,85.333h-98.885     c-29.813,0-58.25-11.208-80.052-31.563L64,347.365v-3.51C64,330.698,74.698,320,87.854,320c3.677,0,7.375,0.875,10.667,2.521     l68.5,34.25c9.979,5,21.646,4.469,31.135-1.396c9.5-5.875,15.177-16.052,15.177-27.229V42.667     c0-11.76,9.573-21.333,21.333-21.333c11.76,0,21.333,9.573,21.333,21.333v160c0,3.938,2.167,7.552,5.635,9.406     c3.458,1.844,7.677,1.646,10.948-0.531l18.688-12.458c13.896-9.271,32.896-9.271,46.792,0l95.688,63.792     c8.927,5.948,14.25,15.906,14.25,26.625V405.333z"/>
                            <path d="M60.875,103.542l24.458-24.458v166.25C85.333,251.229,90.104,256,96,256s10.667-4.771,10.667-10.667V79.083     l24.458,24.458c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125c4.167-4.167,4.167-10.917,0-15.083     l-42.667-42.667c-4.167-4.167-10.917-4.167-15.083,0L45.792,88.458c-4.167,4.167-4.167,10.917,0,15.083     C49.958,107.708,56.708,107.708,60.875,103.542z"/>
                        </g>
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
                </svg></span>
        </BackToTop>
    </Layout>)
}

export default PostTemplate