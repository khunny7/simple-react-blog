import React from 'react'
import todayHumorImporter from './today-humor-importer'

export default class Importer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      htmlContent: 'No content has been loaded'
    }

    this.onImport = this.onImport.bind(this)
  }

  onImport() {
    const urlValue = document.getElementById('input-url').value;

    todayHumorImporter(urlValue).then((content) => {
      this.setState({
        htmlContent: content,
      })
    })
  }

  render() {
    return (
      <div>
        <div>
          <span>URL to import: </span>
          <input type="text" id="input-url" />
          <button onClick={this.onImport}>Import</button>
        </div>
        <div dangerouslySetInnerHTML={{ __html: this.state.htmlContent }} />
      </div>
    )
  }
}
