import { SET_AUTHED_USERS, RESET_AUTHED_USERS } from '../actions/authedUser';

export default function authedUser(state = [], action) {
	switch (action.type) {
		case SET_AUTHED_USERS:
			return action.id;
		case RESET_AUTHED_USERS:
			return null;

		default:
			return state;
	}
}