/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-01-08 18:24:30
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-01-08 18:24:36
 */
import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

export function getToken() {
	return Cookies.get(TokenKey);
}

export function setToken(token) {
	return Cookies.set(TokenKey, token);
}

export function removeToken() {
	return Cookies.remove(TokenKey);
}
