import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import _ from 'lodash'
import {
  convertFromRaw,
} from 'draft-js'
import PostPreview from '../components/post-preview'
import { connect } from 'react-redux'

class BlogIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postings: {},
    };
  }

  render() {
    const siteTitle = 'site title'

    return (
      <div>
        <Grid>
          <Row>
            {_.map(this.props.postings, (posting) => {
              const title = posting.title
              const date = posting.date
              const slug = posting.id
              const content = this._getPlainText(posting.content)

              return (
                <Col xs={6} md={6} key={slug}>
                  <PostPreview title={title} date={date} slug={slug} content={content} />
                </Col>
              )
            })}
          </Row>
        </Grid>

      </div>
    )
  }

  _getPlainText = (rawPostingContent) => {
    try {
      const jsContentObj = JSON.parse(rawPostingContent)
      const contentState = convertFromRaw(jsContentObj)

      return contentState.getPlainText()
    } catch (e) {
      return rawPostingContent
    }
  }
}

const mapStateToProps = (state) => {
  return {
    postings: state.postings,
  }
}

const Container = connect(mapStateToProps)(BlogIndex)

export default Container
