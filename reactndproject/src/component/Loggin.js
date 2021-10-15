import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { setAuthedUsers, resetAuthedUsers } from '../actions/authedUser';

class Loggin extends Component {
	state = {
		usersId: null,
		logInToHome: false,
	}
	
	handleSelect = function(e) {
		const usersId = e.target.value;
	
		this.setState(function(prevState) {
		  return {
			...prevState,
			usersId,
		  };
		});
	}
	
	handleLog = function(e) {
		const { usersId } = this.state;
		const { dispatch } = this.props;
	
		dispatch(setAuthedUsers(usersId));
	
		this.setState(function(prevState) {
		  return {
			...prevState,
			logInToHome: true,
		  };
		});
	}
	
	componentDidMount() {
		this.props.dispatch(resetAuthedUsers())
	}

    render() {
		const { usersId,logInToHome } = this.state;
		const { users } = this.props;
		const { from } = this.props.location.state || { from: { pathname: '/dashboard'}}
		const select = usersId ? usersId : -1

		//if authenticated
		if(logInToHome) {
			return <Redirect to={from} />
		}
        
        return (
		    <div className='loggin'>
		        <div className="center-text"><div> Would You Rather App</div></div>
		        <div className='user-select'>
					<div>Please sign in </div>
					<select id="loggin-select" value={select} onChange={(e) => this.handleSelect(e)}>
						<option value="-1" disabled>SELECT USER</option>
						{Object.keys(users).map(function(key) {
							return (
								<option value={users[key].id} key={key}>
									{users[key].name}
								</option>
							);
						})}
					</select>
				</div>

				<button
					className='boton'
					disabled={usersId === null}
					onClick={(e) => this.handleLog(e)}>
					Login
				</button>
				{}
          </div>
		);  
    }
}

function mapStateToProps ({users}) {  
    return {
      	usersId: Object.keys(users),
      users,
    };
  }

export default withRouter(connect(mapStateToProps)(Loggin));