import React from 'react'
import { Link } from 'react-router-dom'
import AuthView from '../auth'

export default class Header extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: '#EEDDEE',
        }}
      >
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
        <AuthView />
      </div>
    )
  }
}
