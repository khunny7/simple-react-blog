import React from 'react'
import { Grid, Row, ButtonToolbar, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { savePostingAsync } from '../data/mock-data-source'
// import { addPosting } from '../store/actions'
import Editor from '../components/editor'
import BlockUi from 'react-block-ui';
import Importer from '../components/importer'

class NewPostings extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.getTitleInputValidationState = this.getTitleInputValidationState.bind(this)
    this.state = {
      blocking: false,
      titleString: ''
    }
    this.isTitleDirty = false
  }

  onSave() {
    const savedData = this.editorRef.serialize()
    localStorage.setItem('draft', savedData)
    this.setState({ blocking: !this.state.blocking })
    savePostingAsync(this.state.titleString, savedData).then((savedPosting) => {
      this.setState({ blocking: !this.state.blocking })
      // store.dispatch(addPosting(savedPosting))
      this.props.history.push('/')
    })
  }

  onLoad(loadData) {
    const loadedData = localStorage.getItem('draft')
    this.editorRef.deserialize(loadedData)
  }

  handleTitleChange(e) {
    this.isTitleDirty = true;
    this.setState({
      titleString: e.target.value
    })
  }

  getTitleInputValidationState() {
    if (!this.isTitleDirty) {
      return null;
    }

    const length = this.state.titleString.length;
    if (length < 1) {
      return 'error'
    } else if (length < 5) {
      return 'warning'
    }

    return null
  }

  render() {
    return (
      <BlockUi tag="div" blocking={this.state.blocking}>
        {/* <Row>
            <Importer />
          </Row> */}
        <Row>
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getTitleInputValidationState()}
            >
              <ControlLabel>Title for the posting</ControlLabel>
              <FormControl
                type="text"
                value={this.state.titleString}
                placeholder="Enter title"
                onChange={this.handleTitleChange}
              />
              <FormControl.Feedback />
            </FormGroup>
          </form>
        </Row>
        <Row>
          <Editor ref={(node) => this.editorRef = node} />
        </Row>
        <Row>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={this.onSave}>Save</Button>
            <Button bsStyle="success" onClick={this.onLoad}>Load</Button>
            <Button onClick={this.onCancel}>Cancel</Button>
          </ButtonToolbar>
        </Row>
      </BlockUi>
    );
  }
}

export default NewPostings
