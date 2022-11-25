import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	region: {},
	district: {},
	city: {},
	street: {},
	building: {},
};

export const userAddressSlice = createSlice({
	name: 'userAddress',
	initialState,

	reducers: {
		setRegion: (state, action) => {
			state.region = action.payload.region;
		},

		setDistrict: (state, action) => {
			state.district = action.payload.district;
		},
	},

	extraReducers: {},
});

export const { setRegion, setDistrict } = userAddressSlice.actions;
export default userAddressSlice.reducer;
