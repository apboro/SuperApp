import { useDispatch, useSelector } from 'react-redux';
import s from './headerDocument.module.css';
import { addNewBlock } from '../../../../store/features/headerBlockListSlice';
import { getBlockList } from '../../../../store/features/headerDocumentSlice';
import { HeaderBlock } from './headerBlock/headerBlock';

export const HeaderDocument = () => {
	const dispatch = useDispatch();
	const headerBlockList = useSelector((store) => store.headerBlockList);

	const addNewHeaderBlock = () => {
		dispatch(addNewBlock());
	};
	const createHeaderBlockList = () => {
		dispatch(getBlockList({ headerBlockList }));
	};

	return (
		<div className={s.block}>
			<h1>Шаг 1: Шапка документа</h1>

			<form>
				{headerBlockList.map((block) => (
					<HeaderBlock key={block.id} block={block} />
				))}
			</form>

			<button type='button' onClick={addNewHeaderBlock}>
				Добавить новый блок
			</button>

			<button type='button' onClick={createHeaderBlockList}>
				Создать шапку
			</button>
		</div>
	);
};
