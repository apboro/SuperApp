import s from './app.module.css';
import { Header } from '../common/header/header';
import { MainPage } from '../pages/mainPage/mainPage';
import { Footer } from '../common/footer/footer';
import { Constructor } from '../pages/constructorPage/constructorPage';
import { TestSector } from '../testUchastok';
import TextEditor from '../textEditor/textEditor';
import { EditorDocument } from '../editorDocument/editorDocument';
import { useState } from 'react';
import { DraftJS } from '../draftJS/draftJS';
import { DraftWysiwyg } from '../draftWysiwyg/draftWysiwyg';

export const App = () => {
	return (
		<div className={s.container}>
			<Header />

			{/* <EditorDocument /> */}

			{/* <TextEditor /> */}

			{/* <DraftJS /> */}

			<DraftWysiwyg />

			{/* <MainPage /> */}
			{/* <Constructor /> */}
			{/* <TestSector /> */}

			{/* <Footer /> */}
		</div>
	);
};
