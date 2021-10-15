export const SET_AUTHED_USERS = ' SET_AUTHED_USERS';
export const RESET_AUTHED_USERS= 'RESET_AUTHED_USERS';

export function setAuthedUsers(id) {
	return {
		type: SET_AUTHED_USERS,
		id
	};
}

export function resetAuthedUsers() {
	return {
		type: RESET_AUTHED_USERS
	};
}