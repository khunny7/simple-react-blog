import React from 'react'
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap'

export default class PostPreview extends React.Component {
  render() {
    // const title = get(node, 'frontmatter.title') || node.fields.slug
    const title = this.props.title;
    const slug = this.props.slug;
    const date = this.props.date;
    const content = this.props.content;

    return (
      <div>
        <div>
          <h3
            style={{
              marginBottom: '15px',
            }}
          >
            <Link
              style={{
                boxShadow: 'none',
                fontSize: '15px',
              }}
              to={{
                pathname: '/posting',
                hash: slug,
                state: {
                  title,
                  date,
                  content
                }
              }}
            >
              {title}
            </Link>
          </h3>
        </div>
        <div>
          <small>{date}</small>
        </div>
        <div> {content} </div>
      </div>
    )
  }
}