import React, { Component } from 'react';
import './App.css';
import ErrorBoundary from '../components/Errorboundary';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';

class App2 extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount () {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ robots: users }));
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render() {
		const { robots,searchfield } = this.state;
		const filteredRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})
		return (!robots.length) ?
		(<h1>LOADING.....</h1>) :
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<Searchbox searchChange={this.onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots}/>
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}
}

export default App2;