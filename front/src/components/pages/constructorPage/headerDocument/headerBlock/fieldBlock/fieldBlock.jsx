import s from './fieldBlock.module.css';
import { useDispatch } from 'react-redux';
import {
	setFieldType,
	setFieldValue,
	setIsNecessary,
	deleteField,
} from '../../../../../../store/features/headerBlockListSlice';

export const FieldBlock = ({ blockId, fieldId }) => {
	const dispatch = useDispatch();

	const changeFieldType = (e) => {
		let type = e.target.options[e.target.selectedIndex].value;
		let value = e.target.options[e.target.selectedIndex].innerText;

		dispatch(
			setFieldType({
				blockId,
				fieldId,
				type,
			})
		);
		dispatch(
			setFieldValue({
				blockId,
				fieldId,
				value,
			})
		);
	};
	const isNecessaryFieldToggle = () => {
		dispatch(setIsNecessary({ blockId, fieldId }));
	};
	const deleteFieldBlock = () => {
		dispatch(deleteField({ blockId, fieldId }));
	};

	return (
		<div className={s.row}>
			<select
				onChange={(e) => {
					changeFieldType(e);
				}}
				name='type'>
				<option value=''>Выберите тип поля</option>
				<option value='fullName'>ФИО (полностью)</option>
				<option value='birthday'>Дата рождения</option>
				<option value='passport'>Паспорт</option>
				<option value='phone'>Телефон</option>
				<option value='registrationAddress'>Адрес регистрации</option>
				<option value='residentialAddress'>Адрес проживания</option>
				<option value='snils'>СНИЛС</option>
			</select>

			<label>
				<input type='checkbox' onClick={isNecessaryFieldToggle} />
				Обязательное поле
			</label>

			<button type='button' onClick={deleteFieldBlock}>
				Удалить поле
			</button>
		</div>
	);
};
