import { useDispatch } from 'react-redux';
import s from './headerBlock.module.css';
import {
	setBlockName,
	setBlockValue,
	addField,
	deleteBlock,
} from '../../../../../store/features/headerBlockListSlice';
import { FieldBlock } from './fieldBlock/fieldBlock';

export const HeaderBlock = ({ block }) => {
	const dispatch = useDispatch();

	const changeBlockName = (e, blockId) => {
		let blockName = e.target.options[e.target.selectedIndex].value;
		let blockValue = e.target.options[e.target.selectedIndex].innerText;

		dispatch(
			setBlockName({
				blockId,
				blockName,
			})
		);
		dispatch(
			setBlockValue({
				blockId,
				blockValue,
			})
		);
	};
	const addFieldBlock = (blockName) => {
		dispatch(addField(blockName));
	};
	const deleteHeaderBlock = (blockId) => {
		dispatch(deleteBlock({ blockId }));
	};

	return (
		<div className={s.fieldListBlock}>
			<select
				onChange={(e) => {
					changeBlockName(e, block.id);
				}}
				name='blockName'>
				<option value=''>Выберите название блока</option>
				<option value='claimant'>Истец</option>
				<option value='defendant'>Ответчик</option>
			</select>

			{block.fieldList.map((field) => (
				<FieldBlock key={field.id} blockId={block.id} fieldId={field.id} />
			))}

			<button
				type='button'
				onClick={() => {
					addFieldBlock(block.blockName);
				}}>
				Добавить поле
			</button>

			<button
				type='button'
				onClick={() => {
					deleteHeaderBlock(block.id);
				}}>
				Удалить блок
			</button>
		</div>
	);
};
