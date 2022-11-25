import { Editor, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';

export const DraftJS = () => {
	const editor = useRef(null);
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	const focus = () => {
		console.log(editor);
		editor.current.focus();
	};

	return (
		<div onClick={focus}>
			<Editor
				ref={editor}
				editorState={editorState}
				placeholder='Tell a story...'
				onChange={(e) => {
					console.log('e', e);
					console.log('editorState', editorState);
					console.log('editor', editor.current);
					// setEditorState(editor.current.getEditorState());
				}}
			/>

			<div>
				<textarea
					disabled
					value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
				/>
			</div>
		</div>
	);
};
