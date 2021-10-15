import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { receivedAddQuestions } from  '../actions/questions'

class Nquestion extends Component {	
	state = {      
    	optionOneText:'',
		optionTwoText:'',
		loginToHome: false
	};

	handleInputChange = (ev, type) => {
		const value = ev.target.value;

		this.setState((state) => {
			return type === 'option1' ? {...state, optionOneText: value} : {...state, optionTwoText: value}
		});
	}

	handleSubmit = (ev) => {   
    	ev.preventDefault();

    	const { dispatch } = this.props
    	const { optionOneText, optionTwoText} = this.state   
    
    	dispatch(receivedAddQuestions(
      		optionOneText,
      		optionTwoText
    	))

    	this.setState({
        	optionOneText:'',
			optionTwoText:'',
			loginToHome: true
      	})
  	}
 
	render() {
		const { loginToHome } = this.state;

		if (loginToHome) {
			
			return <Redirect to='/dashboard' />
		}

		return (
			<div className="new-question">
				<div className="center-text"> New Question</div>
				<form onSubmit={this.handleSubmit}>
					<div className="rather">Would you rather</div>
					<input 
						name="optionOneText"
						type="text"
						placeholder="Enter Option One"
						value={this.state.optionOneText}
						onChange={(ev) => this.handleInputChange(ev, 'option1')} />
					<div className="or">Or</div>
					<input 
						name="optionTwoText"
						type="text"
						placeholder="Enter Option Two "
						value={this.state.optionTwoText}
						onChange={(ev) => this.handleInputChange(ev, 'option2')} />

					<button type="submit">Submit</button>
				</form>
			</div> 
  		)
	}
}

export default connect()(Nquestion);