// import { sectorListApi } from '../api/api';

import { useDispatch } from 'react-redux';
import { getSectorList } from '../store/features/sector/sectorSlice';

export const TestSector = () => {
	// sectorListApi.getSectorList().then((data) => {
	// 	console.log(data);
	// 	return data.uchastki;
	// });

	const dispatch = useDispatch();

	dispatch(getSectorList());

	return (
		<div>
			<select name='' id=''>
				<option>district</option>
			</select>
			<select name='' id=''>
				<option>city</option>
			</select>
			<select name='' id=''>
				<option>street</option>
			</select>
			<select name='' id=''>
				<option>house</option>
			</select>

			<p>data</p>
		</div>
	);
};
