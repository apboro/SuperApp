import s from './mainPage.module.css';
import shield from '../../../img/shield.png';

export const MainPage = () => {
	return (
		<main>
			<div className={`section ${s.titleBlock}`}>
				<h2 className={`title ${s.title}`}>
					Юридические услуги в твоем кармане
				</h2>

				<p className={`text ${s.titleText}`}>
					Больше не нужно тратить время на посещение юристов. Все что требуется
					- это заполнить анкету.
				</p>
			</div>

			<section className={`section ${s.howThisWork}`}>
				<h3 className={`subtitle ${s.subtitle}`}>Как это работает?</h3>

				<div className={`text ${s.gridBlock}`}>
					<ol className={s.list}>
						<li className={s.item}>Заполняете анкету</li>
						<li className={s.item}>Скачиваете документ</li>
						<li className={s.item}> Относите в нужное учреждение</li>
					</ol>

					<div className={s.rightBlock}>
						<img src={`${shield}`} />
						<p>Гарантия принятия документов </p>
					</div>

					<p></p>

					<p className={`text ${s.rightBtmText}`}>
						*Возможна подача документов онлайн
					</p>
				</div>
			</section>
		</main>
	);
};
