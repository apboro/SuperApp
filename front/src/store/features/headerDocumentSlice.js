import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const headerDocumentSlice = createSlice({
	name: 'headerDocument',
	initialState,

	reducers: {
		getBlockList: (state, action) => {
			return (state = action.payload.headerBlockList);
		},
	},
});

export const { getBlockList } = headerDocumentSlice.actions;
export default headerDocumentSlice.reducer;
