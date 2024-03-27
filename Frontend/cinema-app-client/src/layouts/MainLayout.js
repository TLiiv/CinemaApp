import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';


     const MainLayout = () => {
        return (
            <>
            {/* <MainNav/> */}
            <main>
            <Outlet />
            </main>
            {/* <Footer/> */}
            </>
        );
     }

     export default MainLayout;
