import s from './menu.module.css';

export const Menu = () => {
	return (
		<div className={`${s.btnMenu}`}>
			<input id={s.menuToggle} type='checkbox' />
			<label
				className={s.menuToggleLabel}
				htmlFor={s.menuToggle}
				// onClick={() => handlerClickMenu()}
			/>
			<div className={s.burgerMenu}></div>
			{/* <p>Menu</p> */}
		</div>
	);
};
