import React, { Component } from 'react';
import SearchResult from './SearchResult.jsx';
import GoogleMapReact from 'google-map-react';

class SearchResults extends Component {

  render() {
    const { results } = this.props;
    console.log(this.props)
    const searchResults = results && results.map(({ address, borough, complaintType, date, description }, i) => {
      return (
        <SearchResult 
          key={`result${i}`}
          address={address} 
          borough={borough}
          complaintType={complaintType}
          date={date}
          description={description}
        />
      )
    })
    return (
      <div className="results">
        <form className="search" onSubmit={this.props.address}>
          <input id="search" type="text" placeholder="SEARCH FOR YOUR ADDRESS" />
          <select id="searchBox" className="borough">
            <option value="brooklyn">Brooklyn</option>
            <option value="queens">Queens</option>
            <option value="manhattan">Manhattan</option>
            <option value="bronx">Bronx</option>
            <option value="staten island">Staten Island</option>
          </select>
          <button id="searchButton">Search</button>
        </form>

        <div className="search-results">
          {searchResults}
        </div>
        <div style={{ height: '50vh', width: '30%' }}>
          <GoogleMapReact
          bootstrapURLKeys={{key: "AIzaSyApkyVt-_U0QsEaeiVFEBHH1YUsvaKC6Ec"}}
          defaultZoom={11}
          defaultCenter={{lat: 59.95, lng: 30.30 }} 
          >
          </GoogleMapReact>
        </div>
      </div>
    )
  }
}

export default SearchResults;
