import Header from '@editorjs/header';

export const tools = {
	header: {
		class: Header,
		inlineToolbar: true,
		config: {
			placeholder: 'Enter a header',
			levels: [2, 3, 4],
			defaultLevel: 3,
		},
	},
};
