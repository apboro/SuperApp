import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sectorListApi } from '../../../api/api';

const initialState = [];

export const getSectorList = createAsyncThunk(
	'sectorList/getSectorList',
	async (_, { rejectWithValue, dispatch }) => {
		const res = await sectorListApi.getSectorList();
		dispatch(setSectorList({ data: res.data.result }));
	}
);

export const sectorSlice = createSlice({
	name: 'sectorList',
	initialState,

	reducers: {
		setSectorList: (state, action) => (state = action.payload.data),
	},

	extraReducers: {},
});

export const { setSectorList } = sectorSlice.actions;
export default sectorSlice.reducer;
