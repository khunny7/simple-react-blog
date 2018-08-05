import React from 'react'
import Radium from 'radium'
import _ from 'lodash'
import {
  convertFromRaw,
} from 'draft-js'
import PostPreview from '../post-preview'
import { connect } from 'react-redux'
import BlockUi from 'react-block-ui';
import { getPostingListAsync, getNextPostingListAsync } from '../../data/firebase-data-repository'
import { setPostings, setPostingListViewState } from '../../store/actions'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const postingListStyle = {
  base: {
    backgroundColor: "#F5F5F5",
    outline: "none",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0px 1px 2px 0px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15)",
    minHeight: "1024px",
  }
}

class PostingList extends React.Component {
  constructor(props) {
    super(props)

    this.onIntersect = this.onIntersect.bind(this)
    this.tryLoadNextPage = this.tryLoadNextPage.bind(this)
    this.setupIntersectionObserver()
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    this.intersectionObserver = new IntersectionObserver(this.onIntersect, options)
  }

  onIntersect(entries, observer) {
    entries.forEach((entry) => {
      if (entry.target.className === 'top-sentinel') {
        if (entry.intersectionRatio === 1) {
          // try to load the previous page
        }
      } else if (entry.target.className === 'bottom-sentinel') {
        if (entry.intersectionRatio === 1) {
          // try to load the next page
          this.tryLoadNextPage();
        }
      }
    })
  }

  tryLoadNextPage() {
    // if currently loading or if it does not have more just return
    if (!this.props.hasMore || this.props.isLoading) {
      return;
    }

    store.dispatch(setPostingListViewState({
      isLoading: true,
    }));

    // TODO: set some loading icon
    // Get the oldest timestamp shown
    const lastTimestamp = this.props.postings[this.props.postings.length - 1].timestamp

    getNextPostingListAsync(lastTimestamp).then(({ postings, hasMore }) => {
      store.dispatch(setPostings([
        ...this.props.postings,
        ...postings,
      ]));
      store.dispatch(setPostingListViewState({
        pageNumber: this.props.pageNumber + 1,
        hasMore,
        isLoading: false,
      }));
    })
  }

  componentDidMount() {
    this.loadPostingList()

    // TODO: start observing after posting is done loading
    const topSentinel = document.querySelector('.top-sentinel')
    const bottomSentinel = document.querySelector('.bottom-sentinel')

    this.intersectionObserver.observe(topSentinel)
    this.intersectionObserver.observe(bottomSentinel)
  }

  loadPostingList() {
    // true for is loading empty list of postings
    store.dispatch(setPostingListViewState({
      isLoading: true,
    }));
    getPostingListAsync(this.props.pageNumber).then(({ postings, hasMore }) => {
      store.dispatch(setPostings([
        ...postings,
        ...this.props.postings,
      ]));
      store.dispatch(setPostingListViewState({
        isLoading: false,
        hasMore,
        pageNumber: 0,
      }));
    })
  }

  render() {
    return (
      <BlockUi tag="div" blocking={this.props.isLoading}>
        <div style={postingListStyle.base}>
          <div className="top-sentinel" />
          <TransitionGroup className="posting-list-transition-group">
            {_.map(this.props.postings, (posting) => {
              const title = posting.title
              const timestamp = posting.timestamp
              const slug = posting.id
              const content = this._getPlainText(posting.content)
              const authorUid = posting.authorUid
              const authorDisplayName = posting.authorDisplayName

              return (
                <CSSTransition
                  key={slug}
                  timeout={2000}
                  classNames="fade">
                  <PostPreview
                    title={title}
                    timestamp={timestamp}
                    slug={slug}
                    content={content}
                    authorUid={authorUid}
                    authorDisplayName={authorDisplayName}
                  />
                </CSSTransition>
              )
            })}
          </TransitionGroup>
          <div className="bottom-sentinel" />
        </div>
      </BlockUi>
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
    postings: state.hasOwnProperty('postings') ? state.postings : [],
    isLoading: state.postingListView.hasOwnProperty('isLoading') ? state.postingListView.isLoading : true,
    pageNumber: state.postingListView.hasOwnProperty('pageNumber') ? state.postingListView.pageNumber : 0,
    hasMore: state.postingListView.hasOwnProperty('hasMore') ? state.postingListView.hasMore : false,
  }
}

const StylizedPostingList = Radium(PostingList)

const Container = connect(mapStateToProps)(StylizedPostingList)

export default Container
