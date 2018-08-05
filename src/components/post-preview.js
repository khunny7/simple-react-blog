import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router-dom'

const postPreviewStyles = {
  base: {
    backgroundColor: "#FFFFFF",
    border: "1px solid #CCCCCC",
    borderRadius: "4px",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "0px 1px 2px 0px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15)",

    ':hover': {
      transform: "translate(-0.2rem, -0.2rem)",
      boxShadow: "0px 1px 2px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15)",
      border: "1px solid rgba(255,122,122,0.5)",
      cursor: "pointer",
    }
  }
}

class PostPreview extends React.Component {
  constructor(props) {
    super(props)

    this.onUserNameClicked = this.onUserNameClicked.bind(this)
  }

  onUserNameClicked(event) {
    // TODO: navigates to the user profile page
    console.log('go to: ' + event.target.id)
  }

  render() {
    // const title = get(node, 'frontmatter.title') || node.fields.slug
    const title = this.props.title;
    const slug = this.props.slug;
    const timestamp = this.props.timestamp;
    const content = this.props.content;
    const authorDisplayName = this.props.authorDisplayName;
    const authorUid = this.props.authorUid;

    return (
      <div style={postPreviewStyles.base}>
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
                  timestamp,
                  content
                }
              }}
            >
              {title}
            </Link>
          </h3>
        </div>
        <div> {content} </div>
        <span>
          <a
            href='javascript:void(0)'
            onClick={this.onUserNameClicked}
            id={authorUid}
          >
            {authorDisplayName}
          </a>
        </span>
        <span>
          <small>{(new Date(timestamp)).toLocaleString()}</small>
        </span>
      </div>
    )
  }
}

export default Radium(PostPreview)