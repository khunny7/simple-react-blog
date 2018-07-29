import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import _ from 'lodash'
import {
  convertFromRaw,
} from 'draft-js'
import PostPreview from '../components/post-preview'
import { connect } from 'react-redux'
import PostingList from '../components/posting-list'

class BlogIndex extends React.Component {
  render() {
    return (
      <div>
        <PostingList />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const Container = connect(mapStateToProps)(BlogIndex)

export default Container
