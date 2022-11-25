import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://kladr-api.com',
	credentials: true,
	'access-control-allow-credentials': true,
});

export const userApi = {
	getRegionList(region) {
		return instance
			.get(
				`api.php?token=tQSASt9zYG9tdd7srBTQyTAtKYNKYK3r&query=${region}&contentType=region`
			)
			.then((res) => {
				return res.data.result;
			});

		// return instance.get('sud_uchastoks');
		//   .then((res) => {
		// 	if (res.status === 200) return res.data;
		// });
	},

	getDistrictList(district, regionId) {
		return instance
			.get(
				`api.php?token=tQSASt9zYG9tdd7srBTQyTAtKYNKYK3r&regionId=${regionId}&query=${district}&contentType=district`
			)
			.then((res) => {
				return res.data.result;
			});

		// return instance.get('sud_uchastoks');
		//   .then((res) => {
		// 	if (res.status === 200) return res.data;
		// });
	},
};
