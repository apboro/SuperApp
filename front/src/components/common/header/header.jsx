import s from './header.module.css';
import logo from '../../../img/logo.png';
import bell from '../../../img/bell.svg';
import { Menu } from './menu/menu';

export const Header = () => {
	return (
		<header className={s.container}>
			<div className={s.leftBlock}>
				<Menu />

				<div className={s.searchContainer}>
					<input className={s.search} placeholder='Поиск услуги по названию' />

					<div className={s.loupe}></div>
				</div>
			</div>

			<img src={`${logo}`} className={s.logo} />

			<div className={s.rightBlock}>
				<p className={`textLink ${s.item}`}>city</p>

				<img src={`${bell}`} className={`${s.item}`} />

				<p className={`textLink ${s.item}`}>Помощь</p>

				<p className={`textLink ${s.item}`}>Войти</p>
			</div>
		</header>
	);
};
