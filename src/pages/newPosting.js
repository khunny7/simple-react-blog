import React from 'react'
import { Grid, Row, ButtonToolbar, Button } from 'react-bootstrap'
import { savePostingAsync } from '../data/mock-data-source'
import { addPosting } from '../store/actions'
import Editor from '../components/editor'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

class NewPostings extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.state = {
      blocking: false
    }
  }

  onSave() {
    const savedData = this.editorRef.serialize()
    localStorage.setItem('draft', savedData)
    this.setState({ blocking: !this.state.blocking })
    savePostingAsync('sample title', savedData).then((savedPosting) => {
      this.setState({ blocking: !this.state.blocking })
      store.dispatch(addPosting(savedPosting))
      this.props.history.push('/')
    })
  }

  onLoad(loadData) {
    const loadedData = localStorage.getItem('draft')
    this.editorRef.deserialize(loadedData)
  }

  render() {
    return (
      <Grid>
        <BlockUi tag="div" blocking={this.state.blocking}>
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
      </Grid>
    );
  }
}

export default NewPostings
