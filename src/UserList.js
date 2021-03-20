// import React from 'react';

// export default function UserList(props){
// 		const users= props.users;
// 		const showNumberOfGames= props.showNumberOfGames;
// 		return (<ul> 
// 			{showNumberOfGames? 
// 			users.map((u) => (<li key={u.username}>{u.username} played 0 games</li>)):
// 			users.map((u) => (<li key={u.username}>{u.username} played * games</li>))}
// 		</ul>);
// }

import React, {Component} from 'react';

export default class UserList extends Component{
	constructor(props){
		super(props);
		this.state= {showNumberOfGames: true};
	}

	handleClick= ()=>{
		this.setState(currentState => ({
			showNumberOfGames: !currentState.showNumberOfGames
		}));
	}

	render(){
		return (
		<div>
			<button className="smallButton"  onClick={this.handleClick}>{(this.state.showNumberOfGames? 'Hide': 'Show')} the number of games played</button>
			<ul> 
				{this.state.showNumberOfGames? 
				this.props.users.map((u) => (<li key={u.username}>{u.username} played 0 games</li>)):
				this.props.users.map((u) => (<li key={u.username}>{u.username} played * games</li>))}
			</ul>
		</div>);
	}	
}