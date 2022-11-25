import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../api/userApi';
import {
	setRegion,
	setDistrict,
} from '../store/features/user/userAddressSlice';

export const TestSector = () => {
	const dispatch = useDispatch();

	const region = useSelector((state) => state.region);

	const [currentRegion, setCurrentRegion] = useState('');
	const [regionList, setRegionList] = useState([]);

	const [currentDistrict, setCurrentDistrict] = useState('');
	const [districtList, setDistrictList] = useState([]);

	const getRegionList = async (e) => {
		const regionList = await userApi.getRegionList(e.target.value);
		setRegionList(regionList);
	};

	const getDistrictList = async (e) => {
		const districtList = await userApi.getDistrictList(
			e.target.value,
			region.id
		);
		setDistrictList(districtList);
	};
	useEffect(() => {});
	return (
		<div>
			<input
				value={currentRegion}
				onChange={(e) => {
					setCurrentRegion(e.target.value);
					getRegionList(e);
				}}
				placeholder='Субъект РФ'
			/>

			{regionList.map((region) => (
				<div
					key={region.id}
					onClick={() => {
						dispatch(setRegion({ region }));
						setCurrentRegion(`${region.typeShort}. ${region.name}`);
						setRegionList([]);
					}}>
					{region.typeShort}. {region.name}
				</div>
			))}

			<input
				value={currentDistrict}
				onChange={(e) => {
					setCurrentDistrict(e.target.value);
					getDistrictList(e);
				}}
				placeholder='Муниципальный округ'
			/>

			{districtList.map((district) => (
				<div
					key={district.id}
					onClick={() => {
						dispatch(setDistrict({ district }));
						setCurrentDistrict(`${district.typeShort}. ${district.name}`);
						setCurrentDistrict([]);
					}}>
					{district.typeShort}. {district.name}
				</div>
			))}
		</div>
	);
};
