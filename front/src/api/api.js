import axios from 'axios';

const instance = axios.create({
	// baseURL: 'http://95.79.30.69:81/api',
	baseURL: 'https://kladr-api.com/api.php',
	// withCredentials: true,
	origin: 'http://localhost:3000',
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
});

export const sectorListApi = {
	getSectorList() {
		return instance.get(
			'?token=tQSASt9zYG9tdd7srBTQyTAtKYNKYK3r&query=Москва&contentType=city'
		);
		// return instance.get('sud_uchastoks');
		//   .then((res) => {
		// 	if (res.status === 200) return res.data;
		// });
	},
};
