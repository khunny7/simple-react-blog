import React from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  ContentState,
  convertFromRaw,
  convertToRaw
} from 'draft-js'
import './rich-editor.css'
import BlockStyleControls from './block-style-controls'
import InlineStyleControls from './inline-style-control'

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    if (props.currentPosting) {
      try {
        const jsContentObj = JSON.parse(props.currentPosting.content)
        const contentState = convertFromRaw(jsContentObj)

        this.state = { editorState: EditorState.createWithContent(contentState) }
      } catch (e) {
        this.state = { editorState: EditorState.createEmpty() }
      }

    } else {
      this.state = { editorState: EditorState.createEmpty() }
    }

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      try {
        const jsContentObj = JSON.parse(store.getState().currentPosting.content)
        const contentState = convertFromRaw(jsContentObj)

        this.setState({
          editorState: EditorState.createWithContent(contentState)
        })
      } catch (e) {
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  serialize() {
    return JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
  }

  deserialize(jsonContentRaw) {
    const jsContentObj = JSON.parse(jsonContentRaw)
    const contentState = convertFromRaw(jsContentObj)

    this.setState({ editorState: EditorState.createWithContent(contentState) })
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
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

export default RichEditor
