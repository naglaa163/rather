import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import Loggin from './Loggin'
import PollPage from './QuestionPage'
import Leaderboard from './Leaderboard'

import Nquestion from './Nquestion';

import PageNotFound from './PageNotFound'
import NavBar from './Navbar';

class App extends Component {
  	componentDidMount() {
    	this.props.dispatch(handleInitialData())
	}

	render() {
		return (
			<Router>
				<Fragment>
					<div className='container'>
						<NavBar />
							<div className="main-content"> 
								<Switch>
									<Route path="/" exact component={Loggin}/>
									<Route path='/dashboard' exact component={Dashboard} />
									<Route path='/add' exact component={Nquestion} />
									<Route path='/question/:id' component={PollPage} />
									<Route path='/leaderboard' component={Leaderboard} />
									<Route path="/not-found" component={PageNotFound} />
								</Switch>
							</div>
					</div>
				</Fragment>
			</Router>
		)
	}
}

export default connect()(App);