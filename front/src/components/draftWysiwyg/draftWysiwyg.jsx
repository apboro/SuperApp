import React, { useState, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import {
	EditorState,
	ContentState,
	convertToRaw,
	convertFromRaw,
	Modifier,
	CompositeDecorator,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import s from './draftWysiwyg.module.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const DraftWysiwyg = () => {
	const refEd = useRef();
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);
	const [fieldList, setFieldList] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const HashtagSpan = (props) => {
		return (
			<span className={s.field} data-offset-key={props.offsetKey}>
				{props.children}
			</span>
		);
	};

	const compositeDecorator = [
		{
			strategy: hashtagStrategy,
			component: HashtagSpan,
		},
	];

	function hashtagStrategy(contentBlock, callback, contentState) {
		// const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
		const HASHTAG_REGEX =
			/(\#[\S]+\#)|(\#[\S]+\s[\S]+\#)|(\#[\S]+\s[\S]+\s[\S]+\#)|(\#[\S]+\s[\S]+\s[\S]+\s[\S]+\#)/g;

		findWithRegex(HASHTAG_REGEX, contentBlock, callback);
	}

	function findWithRegex(regex, contentBlock, callback) {
		const text = contentBlock.getText();
		let matchArr, start;
		while ((matchArr = regex.exec(text)) !== null) {
			start = matchArr.index;
			callback(start, start + matchArr[0].length);
		}
	}

	const createField = () => {
		const currentContent = editorState.getCurrentContent();
		const selection = editorState.getSelection();
		const contentStateWithEntity = currentContent.createEntity(
			'FIELD',
			'IMMUTABLE',
			{
				value: inputValue,
			}
		);
		const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

		const textWithEntity = Modifier.replaceText(
			currentContent,
			selection,
			`#${inputValue}# `,
			null,
			entityKey
		);
		const newEditorState = EditorState.push(
			editorState,
			textWithEntity,
			'insert-characters'
		);

		setEditorState(newEditorState);
		setFieldList(() => {
			const newFieldList = [...fieldList, inputValue];
			return newFieldList;
		});
		setInputValue('');
	};
	// CHANGE ADD FIELD
	const addField = (value) => {
		const currentContent = editorState.getCurrentContent();
		const selection = editorState.getSelection();
		const contentStateWithEntity = currentContent.createEntity(
			'FIELD',
			'IMMUTABLE',
			{
				value: value,
			}
		);
		const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
		const textWithEntity = Modifier.replaceText(
			currentContent,
			selection,
			`#${value}# `,
			null,
			entityKey
		);
		const newEditorState = EditorState.push(
			editorState,
			textWithEntity,
			'insert-characters'
		);
		setEditorState(newEditorState);
	};

	const replaceFieldInDocument = (fieldName, value) => {
		const content = convertToRaw(editorState.getCurrentContent());
		console.log(content);

		const blockList = content.blocks;

		const map = blockList.map((block) => {
			const textArr = block.text.split('');
			// console.log(textArr);

			function arrayConverter(arr) {
				let field = false;
				let fieldStr = '';
				const newArr = [];

				arr.forEach((el, i) => {
					if (el !== '#' && !field) {
						newArr.push(el);
						return;
					}

					if (el === '#' && field) {
						field = false;
						fieldStr += el;
						newArr.push(fieldStr);
						fieldStr = '';
						return;
					}

					if (el === '#' && !field) {
						field = true;
					}

					fieldStr += el;
				});

				return newArr;
			}

			console.log(arrayConverter(textArr));
		});

		//
		// const newTextList = blockList.map((block) => {
		// 	const reg = /(\s)/;
		// 	const textMap = block.text.split('');
		// 	console.log(textMap);

		// 	const newTextMap = textMap.map((el) =>
		// 		el === `#${fieldName}#` ? value : el
		// 	);
		// 	// console.log(newTextMap);

		// 	const newTextSting = newTextMap.join(' ');
		// 	// console.log(newTextSting);
		// 	return newTextSting;
		// });
		// console.log(newTextList);

		// blockList.forEach((el, i) => (el.text = newTextList[i]));
		// console.log(content);
		const newContent = convertFromRaw(content);
		// const newEditorState = EditorState.push(
		// 	editorState,
		// 	newContent,
		// 	'insert-characters'
		// );
		// setEditorState(newEditorState);
	};
	// console.log('rerender');
	// console.log(convertToRaw(editorState.getCurrentContent()));

	return (
		<>
			<div className={s.editorBlock}>
				<Editor
					ref={refEd}
					editorClassName={`${s.editor} ${s.height}`}
					editorState={editorState}
					onEditorStateChange={setEditorState}
					toolbar={{
						options: ['inline', 'blockType', 'list', 'textAlign', 'history'],
						inline: {
							inDropdown: false,
							className: undefined,
							component: undefined,
							dropdownClassName: undefined,
							options: [
								'bold',
								'italic',
								'underline',
								'strikethrough',
								// 'monospace',
							],
						},
					}}
					placeholder={'Создайте документ'}
					customDecorators={compositeDecorator}
					localization={{
						locale: 'ru',
					}}
				/>

				<div className={s.fieldListBlock}>
					<p className={s.fieldListTitle}>Список полей</p>

					<div className={s.addFieldBlock}>
						<input
							value={inputValue}
							onChange={(e) => {
								setInputValue(e.target.value);
							}}
							placeholder='Введите название поля'
						/>
						<button onClick={createField}>Создать поле</button>
					</div>

					<div>
						{fieldList.map((field, i) => (
							<div key={i} className={s.fieldContainer}>
								<span className={s.fieldName}>{field}</span>
								<button
									onClick={() => {
										addField(field);
									}}>
									+
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

			<button
				onClick={() => {
					replaceFieldInDocument('a a', 'Марк');
				}}>
				Заменить
			</button>

			<div>
				<textarea
					disabled
					value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
				/>
			</div>

			<div>
				<textarea
					disabled
					value={JSON.stringify(editorState.getCurrentContent(), null, 4)}
				/>
			</div>
		</>
	);
};

// const click = () => {
// 	const edState = refEd.current.getEditorState();
// 	const edCurCon = edState.getCurrentContent();
// 	const edSelection = edState.getSelection();

// 	const x = (htmlStr) => {
// 		const htmlMap = htmlStr.split('\n');
// 		// console.log('htmlMap', htmlMap);

// 		let targetEl = htmlMap[htmlMap.length - 2];
// 		// console.log('targetEl', targetEl);

// 		const targetElMap = targetEl.split('').reverse();
// 		// console.log('targetElMap', targetElMap);

// 		targetElMap.splice(
// 			4,
// 			0,
// 			'<span style="color: red;background-color: rgb(241,241,241);font-size: 17px;font-family: monospace;">НАЗВАНИЕ ПОЛЯ</span> '
// 		);
// 		targetElMap.reverse();
// 		// console.log('targetElMapNew', targetElMap);

// 		targetEl = targetElMap.join('');
// 		// console.log('targetEl', targetEl);

// 		htmlMap.splice(htmlMap.length - 2, 1, targetEl);
// 		// console.log('htmlStr', htmlMap.join('\n'));
// 		return htmlMap.join('\n');
// 	};

// 	const htmlState = draftToHtml(convertToRaw(editorState.getCurrentContent()));

// 	// console.log('htmlState', htmlState);
// 	const newHtmlState = x(htmlState);
// 	// console.log('newHtmlState', newHtmlState);

// 	const blocksFromHtml = htmlToDraft(newHtmlState);
// 	// const blocksFromHtml = htmlToDraft(
// 	// 	'<span style="color: red;background-color: rgb(241,241,241);font-size: 17px;font-family: monospace;">FIELD</span>'
// 	// );
// 	console.log(blocksFromHtml);

// 	const { contentBlocks, entityMap } = blocksFromHtml;
// 	const contentState = ContentState.createFromBlockArray(
// 		contentBlocks,
// 		entityMap
// 	);

// 	const newEditorState = EditorState.createWithContent(contentState);
// 	setEditorState(newEditorState);

// 	// const newContent = Modifier.replaceText(edCurCon, edSelection, `newText`);
// 	// const newState = EditorState.push(edState, newContent, 'insert-characters');

// 	// setEditorState(newState);
// };
