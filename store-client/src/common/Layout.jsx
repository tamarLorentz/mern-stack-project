import { Outlet } from 'react-router-dom'
import { Menubar } from 'primereact/menubar';
import BasicDemo from './nav';
const Layout=()=>{
    return(
        <>
        <header>
         <BasicDemo/>
        </header>
        <main>
            <Outlet/>
        </main>
        <footer></footer>
        </>
    )
}
export default Layout