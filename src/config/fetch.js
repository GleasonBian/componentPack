import { baseUrl } from './env'
var qs = require('qs');
import axios from "axios";
axios.defaults.baseURL = '/api';
axios.defaults.method = 'post';

// 设置 所有 axios 请求携带数据 序列化
axios.defaults.transformRequest = [function (data) {
  return qs.stringify(data);
}];
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}
	if (window.fetch && method == 'fetch') {
			return new Promise((resolve, reject) => {
				axios.post(url, data).then(res => {
						resolve(res.data)
					}).catch(err => {
					  reject(err)
					})
			})
	}
}