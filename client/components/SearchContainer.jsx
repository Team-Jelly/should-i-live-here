import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResults from './SearchResults.jsx';

import * as actions from '../actions/actions.js';

const mapStateToProps = (state) => ({
  results: state.search.current_results,
  userId: state.auth.currentUser.id,
  longitude: state.search.longitude,
  latitude: state.search.latitude,
});

const mapDispatchToProps = (dispatch) => ({
  addressSearch: (address, borough, userId) => dispatch(actions.addressSearch(address, borough, userId)),
  getSearchHistory: (userId) => dispatch(actions.getSearchHistory(userId)),
});

class SearchContainer extends Component {
  constructor() {
    super();

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.userId;
    this.props.getSearchHistory(id);
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const address = e.target[0].value;
    const borough = e.target[1].value;
    const id = this.props.userId;
    this.props.addressSearch(address, borough, id);
  }


  render() {
    return (
      <div>
        <SearchResults 
          lat= {this.props.latitude}
          lng= {this.props.longitude}
          address={this.onSearchSubmit} 
          results={this.props.results}
          />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
