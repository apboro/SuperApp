import axios from 'axios';

const instance = axios.create({
	// baseURL: 'http://95.79.30.69:81',
	baseURL: 'https://kladr-api.com',
	credentials: true,
	'access-control-allow-credentials': true,
});

export const sectorListApi = {
	getSectorList() {
		return instance.get(
			'api.php?token=tQSASt9zYG9tdd7srBTQyTAtKYNKYK3r&query=арх&contentType=region'
		);
		// return instance.get('sud_uchastoks');
		//   .then((res) => {
		// 	if (res.status === 200) return res.data;
		// });
	},
};
