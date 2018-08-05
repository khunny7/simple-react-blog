import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import _ from 'lodash'
import {
  convertFromRaw,
} from 'draft-js'
import { connect } from 'react-redux'
import PostingList from '../components/posting-list'

class BlogIndex extends React.Component {
  constructor(props) {
    super(props)
    this.onAddPostingClicked = this.onAddPostingClicked.bind(this)
  }

  onAddPostingClicked() {
    this.props.history.push('/new-posting')
  }

  render() {
    const addPostingStyle = {
      fontSize: "40px",
      color: "tomato",
      position: "fixed",
      left: "30px",
      top: "80px",
    }

    return (
      <div>
        <Glyphicon
          style={addPostingStyle}
          glyph="plus-sign"
          onClick={this.onAddPostingClicked}
        />
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
