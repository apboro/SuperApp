import { configureStore } from '@reduxjs/toolkit';
import headerDocumentSlice from './features/headerDocumentSlice';
import headerBlockListSlice from './features/headerBlockListSlice';
import sectorSlice from './features/sector/sectorSlice';

export const store = configureStore({
	reducer: {
		headerBlockList: headerBlockListSlice,
		headerDocument: headerDocumentSlice,
		sectorList: sectorSlice,
	},
});
