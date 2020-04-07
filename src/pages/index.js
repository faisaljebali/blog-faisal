import React from "react"
import { graphql,Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <div>
    <h1>Learn With Jason — Recent Episodes</h1>
    {data.posts.nodes.map(lesson => (
      <div key={`lesson-${lesson.slug}`}>
        <h2>
          <Link to={`/${lesson.slug}`}>
            {lesson.title}
          </Link>
        </h2>
      </div>
    ))}
  </div>

  </Layout>
)

export const postsQuery = graphql`
  query {
    posts: allContentfulPost {
      totalCount
      nodes {
        title
        id
        tag
        updatedAt
        createdAt
        childContentfulPostContentRichTextNode {
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
