import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import ErrorBoundary from '../components/Errorboundary';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import { setSearchField } from '../actions';

const mapStateToProps = (state) => {
	return {
		searchField: state.searchField
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}
}

class App2 extends Component {
	constructor() {
		super()
		this.state = {
			robots: []
		}
	}

	componentDidMount () {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ robots: users }));
	}

	render() {
		const { robots } = this.state;
		const { searchField,onSearchChange } = this.props;
		const filteredRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return (!robots.length) ?
		(<h1>LOADING.....</h1>) :
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<Searchbox searchChange={onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots}/>
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App2);
