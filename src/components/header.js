import { Link } from "gatsby"
import PropTypes from "prop-types"
import React,{useState} from "react"
import { Helmet } from 'react-helmet'

const Header = (props) => {

  const {siteTitle,defaultTheme} = props ;
  const defaultThemeState = (typeof window !== 'undefined' && window.localStorage.getItem('theme')) || null
  const [theme,setTheme] = useState(defaultThemeState);
  const onChangeTheme = () => {
    const opositeTheme =
      (theme || defaultTheme) === 'light' ? 'dark' : 'light'
  
      setTheme(opositeTheme);
  
    typeof window !== 'undefined' &&
      window.localStorage.setItem('theme', opositeTheme)
  }

  return(
  <>
  <Helmet>
    <body
      className={
        (theme || defaultTheme) === 'light'
          ? 'light-theme'
          : 'dark-theme'
      }
    />
  </Helmet>
  <header>
    <div className="container">
      <div className="menu-header">
        <div className="left-header">
        <Link to="/"  className="h1-logo">
          <span className="faisal-photo"></span>
          {siteTitle}
          <span className="cursor"></span>
        </Link>
        </div>
        <div className="right-header">
          <div className="nav-header">
            <Link to="/"  className="link-nav" activeClassName='is-active'>Home</Link> 
            <Link to="/about"  className="link-nav" activeClassName='is-active'>About</Link>
            <Link to="/contact"  className="link-nav" activeClassName='is-active'>Contact</Link>
          </div>
          <a className="btn btn-header" onClick={onChangeTheme}>
          {(theme || defaultTheme) === 'light' ?
          <svg version="1.1" width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22
3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7
13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z" className="icon-module"></path></svg>
       : 
<svg version="1.1" width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22
3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7
13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z" className="icon-module"></path></svg>
    }
    </a>
      </div>
      </div>
    </div>
  </header>
  </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
