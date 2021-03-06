import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { getPostingAsync } from '../data/firebase-data-repository'
import { connect } from 'react-redux'
import { setPostingViewPosting } from '../store/actions'
import BlockUi from 'react-block-ui';
import {
  EditorState,
  convertFromRaw,
} from 'draft-js'
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin'

const imagePlugin = createImagePlugin()
const plugins = [imagePlugin]

class PostingPage extends React.Component {
  constructor(props) {
    super(props);

    const postingId = props.location.hash.substr(1);

    const tempCurrentPosting = {
      title: props.location.state.title,
      timestamp: props.location.state.timestamp,
      content: props.location.state.content
    }

    store.dispatch(setPostingViewPosting(tempCurrentPosting, true))

    getPostingAsync(postingId).then((posting) => {
      store.dispatch(setPostingViewPosting(posting, false))
    })
  }

  render() {
    const className = 'RichEditor-editor RichEditor-hidePlaceholder';

    let content

    if (this.props.editorState) {
      content =
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={this.props.editorState}
            placeholder="Tell a story..."
            isReadOnly="true"
            ref="editor"
            spellCheck={true}
            plugins={plugins}
          />
        </div>
    } else {
      content =
        <div>
          {this.props.contentString}
        </div>
    }

    return (
      <BlockUi tag="div" blocking={this.props.isLoading}>
        <Row>
          <h3>
            {this.props.title}
          </h3>
        </Row>
        <Row>
          <span>
            <a
              href='javascript:void(0)'
              onClick={this.onUserNameClicked}
              id={this.props.authorUid}
            >
              {this.props.authorDisplayName}
            </a>
          </span>
          <span>
            <small>{(new Date(this.props.timestamp)).toLocaleString()}</small>
          </span>
        </Row>
        <Row>
          {content}
        </Row>
      </BlockUi>
    )
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

const mapStateToProps = (state) => {
  const currentPosting = state.postingView.currentPosting

  let editorState = null
  let contentString = ''

  try {
    const jsContentObj = JSON.parse(currentPosting.content)
    const contentState = convertFromRaw(jsContentObj)

    editorState = EditorState.createWithContent(contentState)
  } catch (e) {
    // regular string content
    contentString = currentPosting.content
  }


  return {
    title: currentPosting.title,
    timestamp: currentPosting.timestamp,
    authorDisplayName: currentPosting.authorDisplayName,
    authorUid: currentPosting.authorUid,
    editorState,
    contentString,
    isLoading: state.postingView.isLoading,
  }
}

const Container = connect(mapStateToProps)(PostingPage)

export default Container
