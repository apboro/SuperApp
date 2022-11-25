import React, { useRef, useState, useEffect, useCallback } from 'react';
import s from './editorDocument.module.css';
import { createReactEditorJS } from 'react-editor-js';
import { tools } from './configurations/tools';
import { i18n } from './configurations/i18n';
import Output from 'editorjs-react-renderer';

const EditorComponent = createReactEditorJS();

export const EditorDocument = () => {
	const editorCore = useRef(null);

	const [state, setState] = useState({
		time: new Date().getTime(),
		blocks: [
			{
				id: '12iM3lqzcm',
				type: 'paragraph',
				data: {},
			},
		],
	});
	const [inputState, setInputState] = useState('');

	// function handleSave() {
	// 	console.log(editorCore.current._editorJS.configuration.data.blocks[0].data);
	// 	editorCore.current.save().then((data) => {
	// 		setState(data);
	// 	});

	// 	// console.log(`savedData: ${savedData}`);
	// }

	const click = () => {
		console.log('add input');

		editorCore.current.save().then((data) => {
			console.log('data:', data);

			setState(() => {
				return {
					...data,
					blocks: [...data.blocks].map((el, i) => {
						console.log(el);

						if (i === data.blocks.length - 1) {
							el.data.text = `${el.data.text ? el.data.text : ''} hhhhhhh`;
						}

						return el;
					}),
				};
			});
		});
	};

	//
	const addField = (inputState) => {
		console.log('add field');

		editorCore.current.save().then((data) => {
			console.log('data:', data);

			setState(() => {
				return {
					...data,
					blocks: [...data.blocks].map((el, i) => {
						console.log(el);

						if (i === data.blocks.length - 1) {
							el.data.text = `${
								el.data.text ? el.data.text : ''
							} #${inputState}#`;
						}

						return el;
					}),
				};
			});
		});
	};

	useEffect(() => {
		console.log('rerender');
		editorCore.current.render(state);
	}, [state]);

	const handleInitialize = useCallback((instance) => {
		editorCore.current = instance;
		console.log(editorCore);
	}, []);

	return (
		<>
			<div className={s.editorContainer}>
				<div className={s.editor}>
					<EditorComponent
						holder='editor'
						placeholder={'Создайте документ'}
						i18n={i18n}
						enableReInitialize={true}
						onInitialize={handleInitialize}
						tools={tools}
						data={state}
						onChange={(e) => {
							let currentBlockIndex = e.blocks.getCurrentBlockIndex();
							let currentBlock = e.blocks.getBlockByIndex(currentBlockIndex);
							let currentBlockText = currentBlock.holder.innerText;
							// console.log(currentBlock);

							// console.log(e);
							// editorCore.current.save().then((data) => {
							// 	console.log('data:', data);

							// 	setState(() => {
							// 		console.log('setState');
							// 		return data;
							// 	});
							// });
						}}></EditorComponent>
				</div>

				<div className={s.editorMenu}>
					Создайте поле
					<div>
						<input
							value={inputState}
							onChange={(e) => {
								setInputState(e.currentTarget.value);
							}}
							placeholder='Введите название поля'
						/>

						<button
							onClick={() => {
								addField(inputState);
								setInputState('');
							}}>
							+
						</button>
					</div>
				</div>

				<button
					onClick={() => {
						click();
					}}>
					click
				</button>
			</div>
		</>
	);
};
