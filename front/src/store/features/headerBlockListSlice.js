import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialState = [
	{
		id: v4(),
		blockName: '',
		blockValue: '',
		fieldList: [
			{
				id: v4(),
				type: '',
				value: '',
				isNecessary: false,
			},
		],
	},
];

export const headerBlockListSlice = createSlice({
	name: 'headerBlockList',
	initialState,
	reducers: {
		setBlockName: (state, action) => {
			let targetBlock = state.find(
				(block) => block.id === action.payload.blockId
			);
			targetBlock.blockName = action.payload.blockName;
		},

		setBlockValue: (state, action) => {
			let targetBlock = state.find(
				(block) => block.id === action.payload.blockId
			);
			targetBlock.blockValue = action.payload.blockValue;
		},

		setFieldType: (state, action) => {
			let targetField = state
				.find((block) => block.id === action.payload.blockId)
				.fieldList.find((field) => field.id === action.payload.fieldId);
			targetField.type = action.payload.type;
		},

		setFieldValue: (state, action) => {
			let targetField = state
				.find((block) => block.id === action.payload.blockId)
				.fieldList.find((field) => field.id === action.payload.fieldId);
			targetField.value = action.payload.value;
		},

		setIsNecessary: (state, action) => {
			let field = state
				.find((block) => block.id === action.payload.blockId)
				.fieldList.find((field) => field.id === action.payload.fieldId);

			field.isNecessary = !field.isNecessary;
		},

		addField: (state, action) => {
			let block = state.find((block) => block.blockName === action.payload);
			block.fieldList.push({
				id: v4(),
				type: '',
				value: '',
				isNecessary: false,
			});
		},

		deleteField: (state, action) => {
			let targetBlock = state.find(
				(block) => block.id === action.payload.blockId
			);
			let newFieldList = targetBlock.fieldList.filter(
				(field) => field.id !== action.payload.fieldId
			);
			targetBlock.fieldList = newFieldList;
		},

		addNewBlock: (state, action) => {
			state.push({
				id: v4(),
				blockName: '',
				blockValue: '',
				fieldList: [
					{
						id: v4(),
						type: '',
						value: '',
						isNecessary: false,
					},
				],
			});
		},

		deleteBlock: (state, action) => {
			return state.filter((block) => block.id !== action.payload.blockId);
		},
	},
});

export const {
	setBlockName,
	setBlockValue,
	setFieldType,
	setFieldValue,
	setIsNecessary,
	addField,
	deleteField,
	addNewBlock,
	deleteBlock,
} = headerBlockListSlice.actions;
export default headerBlockListSlice.reducer;
