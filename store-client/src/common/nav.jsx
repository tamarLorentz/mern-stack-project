import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

export default function BasicDemo() {
    const Navigate = useNavigate()

    const Logout = async () => {
        localStorage.removeItem("userToken")
        await Navigate("/login")
    }

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command:()=>Navigate('/')
        },
        // {
        //     label: 'Products',
        //     icon: 'pi pi-shop',
        //     url: '/list'
        // },
        {
            label: 'Register',
            icon: 'pi pi-user-plus',
            url: '/register',
        },
        {
            label: 'LogIn',
            icon: 'pi pi-sign-in',
            url: '/login',
        },
        {
            label: 'LogOut',
            icon: 'pi pi-sign-out',
            command: () => Logout(),
            disabled: !localStorage.getItem("userToken")
        },
        {
            label: 'Cart',
            icon: 'pi pi-shopping-cart',
            url: '/cart',
            disabled: !localStorage.getItem("userToken")
        },
        {
            label: 'Product management',
            icon: 'pi pi-pencil',
            url: '/manage',
            disabled: !localStorage.getItem("userToken")
        },
    
    ];
    const start = <a href="/"><img src="/Nespresso_logo.png" style={{ height: '40px', marginRight: '10px' }} /></a>;

    return (
        <>
            <style jsx>{`
        .custom-menubar .p-menubar-start {
          display: flex;
          align-items: center;
        }

        .custom-menubar .p-menubar-root-list {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .custom-menubar .p-menubaritem {
          flex: 1;
          text-align: center;
        }

        .custom-menubar .p-menubaritem a {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          padding: 0.5rem;
          text-decoration: none;
          color: inherit;
          transition: color 0.3s ease;
        }

        .custom-menubar .p-menubaritem a:hover {
          color: brown !important;
        }

        .custom-menubar .p-menubaritem .pi {
          margin-right: 0.5rem;
        }
      `}</style>
            <div className="card custom-menubar">
                <Menubar model={items} className="custom-menubar" start={start} />
            </div>
        </>
    );
}

