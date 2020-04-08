import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const About = () => (
  <Layout>
    <SEO title="About" />
    <h1>About me</h1>
    <div className="about-flex">
        <div className="photo-about"></div>
        <div className="detail-about">
        <h4>Name :</h4>
        Faisal Jebali
        <h4>Age :</h4>
        27 years
        <h4>Location :</h4>
        Tunisia
        </div>
    </div>
    <div className="about-me">
    I am an allround web developer. I love structure and order and I also stand for quality.<br />I love spending time on fixing little details and optimizing web apps.<br /> Also I like working in a team, you'll learn faster and much more.<br />
    I merge a passion for usability and user experience with technical knowledge to create cool digital experiences.<br />My repertoire includes programming languages and tools such as ReactJS, VueJS, Wordpress, Angular, MySQL, PHP, HTML, Gulp, SASS, LESS, Bootstrap, Laravel, jQuery, and more.
    </div>
    <br />
    <center><Link to="/">Go back to the homepage</Link></center>
  </Layout>
)

export default About
