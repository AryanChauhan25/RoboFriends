import React, { Component } from 'react';
import './App.css';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import { robots } from '../components/robots';
import Searchbox from '../components/Searchbox';

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: robots,
			searchfield: ''
		}
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render() {
		const filteredRobots = this.state.robots.filter(robot =>{
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
		return (
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<Searchbox searchChange={this.onSearchChange}/>
				<Scroll>
					<CardList robots={filteredRobots}/>
				</Scroll>
			</div>
		);
	}
}

export default App;