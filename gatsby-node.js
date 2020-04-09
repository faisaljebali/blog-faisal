/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({ actions, graphql, reporter }) => {
    const result = await graphql(`
      {
        allContentfulPost {
          nodes {
            slug
          }
        }
      }
    `)
  
    if (result.errors) {
      reporter.panic("Error loading post", JSON.stringify(result.errors))
    }
  
    result.data.allContentfulPost.nodes.forEach(post => {
      actions.createPage({
        path: `/${post.slug}/`,
        component: require.resolve("./src/templates/post-template.js"),
        context: {
          slug: post.slug,
        },
      })
    })
  }