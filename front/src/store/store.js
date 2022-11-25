import { configureStore } from '@reduxjs/toolkit';
import headerDocumentSlice from './features/headerDocumentSlice';
import headerBlockListSlice from './features/headerBlockListSlice';
import sectorSlice from './features/sector/sectorSlice';
import userAddressSlice from './features/user/userAddressSlice';

export const store = configureStore({
	reducer: {
		headerBlockList: headerBlockListSlice,
		headerDocument: headerDocumentSlice,
		// user: userAddressSlice,
		sectorList: sectorSlice,
	},
});
