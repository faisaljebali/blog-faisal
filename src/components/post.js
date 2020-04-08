import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import * as moment from 'moment';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import Truncate from 'react-truncate';
import { getStaticPictureElement } from 'react-contentful-image';



const Post = (props) => {

    const truncateString = (str, num) => {
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
    }

    let tags = props.post.tag.split(';');



  return(
    <>
    {(props.post.photo) ? <div className="post-img-item"><Link to={`/${props.post.slug}`}><img src={`${props.post.photo.file.url}?w=386&q=90`} className="responsive" /></Link></div> : '' }
    <Link to={`/${props.post.slug}`}>
        <div className="post-content">
        <h2>
          
            {props.post.title}
        </h2>
        <div className="posted-on"><svg xmlns="http://www.w3.org/2000/svg" id="Capa_1"  height="20" viewBox="0 0 443.294 443.294" width="20"><path d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z"/><path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z"/></svg>{moment(props.post.createdAt).format('Do MMMM YYYY')}</div>
        <Truncate lines={1} ellipsis={<span>...</span>}>
        {documentToReactComponents(props.post.content.json)}
        </Truncate>
        <div className="tags">
        {tags.map(tag => (
            <span className={`tag tag-${tag}`} key={`tag-${tag}`}>
                #{tag}
            </span>
        ))}
        </div>
        </div>
    </Link>

    </>
  )
}

Post.propTypes = {

}

Post.defaultProps = {

}

export default Post
