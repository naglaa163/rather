import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
    
class NavBar extends Component {
    render() {
        const { user, authedUser } = this.props
        const avatar = user ? user.avatarURL : 'placeholder.png'
        const name = user ? user.name : ''
        return (
    
        
        <nav className='navbar'>
            <ul>
                <li>
                    <NavLink to='/dashboard' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/add' exact activeClassName='active'>
                        New Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' exact activeClassName='active'>
                        Leader Board
                    </NavLink>
                </li>
                {
                    authedUser
                    && <li className="user-inform">
                            <NavLink to='/' exact activeClassName='active'>
                                <div className="user-nav">
                                    <span>Hello {name}</span>
                                    <img
                                    src={avatar}
                                    alt={`Avatar of ${authedUser}`}
                                    className='nav-avatar'
                                    />
                                    <span>Logout</span>
                                </div>
                            </NavLink>
                        </li>
                }
            </ul>
        </nav>
    )
    }
}

function mapStateToProps( { authedUser, users}, props) {
    return {
        authedUser,
        users,
        user: users[authedUser]
    }

}
export default connect(mapStateToProps)(NavBar)