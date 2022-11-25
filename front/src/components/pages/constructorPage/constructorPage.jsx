import { useSelector } from 'react-redux';
import s from './constructorPage.module.css';
import { HeaderDocument } from './headerDocument/headerDocument';

export const Constructor = () => {
	const headerDocument = useSelector((store) => store.headerDocument);

	return (
		<>
			{/* <div className={s.container}>
				<HeaderDocument />

				<div className={s.document}>
					{headerDocument.map((block) => (
						<div key={block.id}>
							<h4>{block.blockValue}</h4>

							{block.fieldList.map((field) => (
								<div key={field.id} className={s.fieldHeaderDocument}>
									<span>{field.value}</span>

									<div className={s.fieldInput}></div>
								</div>
							))}
						</div>
					))}
				</div>
			</div> */}
		</>
	);
};
