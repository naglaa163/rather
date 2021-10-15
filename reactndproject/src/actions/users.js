export const RECEIVED_USERS = 'RECEIVED_USERS';

export function receivedUsers(users) {
	return {
		type: RECEIVED_USERS,
		users
	};
}