import s from './flag.module.css';

export const Flag = () => {
	return (
		<div className={s.container}>
			<div className={s.blue}></div>
			<div className={s.red}></div>
		</div>
	);
};
