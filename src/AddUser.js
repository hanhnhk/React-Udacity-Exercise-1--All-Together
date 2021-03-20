import React, {Component} from 'react';

export default class AddUser extends Component{
	constructor(props){
		super(props);
		this.state= {
			user: {
				firstname: '',
				lastname:'',
				username:''
			},
			duplicatedUsername: false		
		}
	};

	
	handleInputChange= (event) =>{
		const{name, value} = event.target;
		this.setState(currState => ({
			user: {
				...currState.user,
				[name]: value
			},
		}));

		this.checkDuplicatedUsername(event);
	}

	handleAddUser= (event) =>{
		event.preventDefault();
		this.props.addUser(this.state.user);
	}

	violateAddingUser = () => {
		return this.isInputEmpty() ||this.state.duplicatedUsername;
	}
	
	isInputEmpty = () =>{
		const user= this.state.user;
		return user.firstname.trim() === '' || user.lastname.trim() === '' || user.username.trim() === '';
	}

	checkDuplicatedUsername= (event) =>{
		const{name, value} = event.target;
		if(name === 'username'){
			const isDuplicatedUsername= this.props.users.filter(u => u.username.trim() === value.trim()).length !== 0;
			if(this.state.duplicatedUsername != isDuplicatedUsername)
				this.setState({'duplicatedUsername': isDuplicatedUsername});		
		}		
	}

	resetForm= () => {
		this.setState({
			user: {
				firstname: '',
				lastname:'',
				username:''
			},
			duplicatedUsername: false		
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.users.length !== prevProps.users.length) {
			this.resetForm();
		}
	}

	render(){
		return <form>
			<p>Add new user</p>
			<label>Firstname</label>
			<input name='firstname' type='text' value={this.state.user.firstname} onChange={this.handleInputChange}/>
			<br/>

			<label>Lastname</label>
			<input name='lastname' type='text' value={this.state.user.lastname} onChange={this.handleInputChange}/>
			<br/>

			<label>Username</label>
			<input name='username' type='text' value={this.state.user.username} onChange={this.handleInputChange}/>
			<br/>

			<label className='error' hidden={! this.state.duplicatedUsername}>Username must be unique</label>
			<br/>

			<button disabled={this.violateAddingUser()} onClick={this.handleAddUser}>Add</button>
		</form>
	}
}