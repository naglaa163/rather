import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render() {
        const { users} = this.props
        const typeUsers = users.sort( (a, b) => b.totalScore - a.totalScore)

        return (
            <ul className="users">
            {typeUsers.map((users) => (
                <li key={users.id}>
                    <div className="text-list">
                    <div className="text-section section-1">
                        <img alt="avatar" className="avatar" src={`/${users.avatarURL}`}/>
                    </div>
                    <div className="text-section section-2">
                        <div className="user-name">{users.name}</div>
                        <div className="user-answer">
                            <span className="label">Answered questions</span>
                            <span className="value">{Object.keys(users.answers).length}</span>
                        </div>
                        <div className="user-creat">
                            <span className="label">New questions</span>
                            <span className="value">{users.questions.length}</span>
                        </div>
                    </div>
                    <div className="text-section section-3">
                        <div className="total-score-header">Total Score</div>
                        <div className="total-score-count">{users.totalScore}</div>
                    </div>
                    </div>
                </li>
            ))}
            </ul>
        )
    }
}

function mapStateToProps( { users }) {
    const usersgroup = Object.values(users)
    usersgroup.map( (user) => user.totalScore = Object.keys(user.answers).length + user.questions.length )
    return {
        users: usersgroup
    }
}

export default connect(mapStateToProps)(Leaderboard);