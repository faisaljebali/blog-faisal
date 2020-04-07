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
          <button className="btn" onClick={onChangeTheme}>Change</button>
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
