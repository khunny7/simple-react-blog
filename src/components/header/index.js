import React from 'react'
import { Link } from 'react-router-dom'
import AuthView from '../auth'

export default class Header extends React.Component {
  render() {
    const authViewContainerStyle = {
      float: "right"
    }

    const navbarHeaderStyle = {
      width: "100%"
    }

    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header" style={navbarHeaderStyle}>
          <ul className="nav navbar-nav">
            <li>
              <Link
                style={{
                  boxShadow: 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                to={'/'}
              >
                Younghoon Gim Blog
                </Link>
            </li>
            <li>
              <Link
                style={{
                  boxShadow: 'none',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                to={'/new-posting'}
              >
                New Postings
        </Link>
            </li>
          </ul>
          <div style={authViewContainerStyle}>
            <AuthView />
          </div>
        </div>
      </nav>
    )
  }
}
