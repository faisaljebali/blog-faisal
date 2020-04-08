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
    {(props.post.photo) ? <div className="post-img-item"><Link to={`/${props.post.slug}`}><img src={`${props.post.photo.file.url}?w=386&q=90`} /></Link></div> : '' }
        <div className="post-content">
        <h2>
          <Link to={`/${props.post.slug}`}>
            {props.post.title}
          </Link>
        </h2>
        <div className="posted-on">{moment(props.post.createdAt).format('Do MMMM YYYY')}</div>
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
        

    </>
  )
}

Post.propTypes = {

}

Post.defaultProps = {

}

export default Post
