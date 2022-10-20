import s from './app.module.css';
import { Header } from '../common/header/header';
import { MainPage } from '../pages/mainPage/mainPage';
import { Footer } from '../common/footer/footer';
import { Constructor } from '../pages/constructorPage/constructorPage';
import { TestSector } from '../testUchastok';

export const App = () => {
	return (
		<div className={s.container}>
			<Header />

			{/* <MainPage /> */}
			{/* <Constructor /> */}
			<TestSector />

			{/* <Footer /> */}
		</div>
	);
};
