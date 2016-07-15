import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './styles/main.css';
import SearchBox from './SearchBox';
import ListResults from './ListResults';


var Root = React.createClass({
	getInitialState: function(){
		return {filter: '', data:[] };
	},
	//execute right after component is mounted on DOM (after render is finished)
	componentDidMount: function(){
		// set the response data as 'this.state.data'
		$.ajax({
			type:'GET',
			url: 'http://congress.api.sunlightfoundation.com/legislators',
			data: { apikey: '08ca56fde5df4bf5a60411116b6ca372' },
			success: function(response) {
				var legislators = response.results.map(function(obj){
					return obj.first_name + ' ' + obj.last_name;
				});
				// set response as this.state.data
				this.setState( {data: legislators} );
			}.bind(this),
			error: function(err) {
				console.log(err);
			}
		});
	},
	handleFilterChange: function(filter) {
		this.setState( {filter: filter} );
	},
	render: function() {

		var filteredData = this.state.data.filter(function(datum){
			var lowerCaseDatum = datum.toLowerCase();
			var lowerCaseFilter = this.state.filter.toLowerCase();

			return lowerCaseDatum.indexOf(lowerCaseFilter) >= 0;
		}.bind(this));
	return (
	  <div>
	    <SearchBox setFilter={this.handleFilterChange}/>
	    <ListResults results={filteredData} />
	  </div>
	);
	}
});


ReactDOM.render(
	<Root />, 
	document.getElementById('container')
);
