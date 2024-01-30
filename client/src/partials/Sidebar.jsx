import { useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faCubes, faMoneyBillTransfer, faArrowRightArrowLeft, faHandHoldingDollar, faCircleUser, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/logo/logo.svg';
import avatar from '../assets/images/user/astronauta.png';
import { useAuth } from "../contexts/AuthContext";


const Sidebar = () => {
    const [sidebarToggle, setSidebarToggle] = useState(true);
    const { user, logout } = useAuth();
    const toggleValue = () => {
        setSidebarToggle(!sidebarToggle);
    }
    return (
        <aside
            className={`${sidebarToggle ? 'translate-x-0' : '-translate-x-full'} absolute rounded-tr-[3rem] left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#111111] duration-300 ease-linear lg:static lg:translate-x-0`}
        >
            {/* Header ASIDE */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <a href="index.html">
                    <img src={logo} alt="Logo" />
                </a>
                <button className="block lg:hidden" onClick={toggleValue}>
                    <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" fill="" />
                    </svg>
                </button>
            </div>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear h-screen">
                {/* Sidebar Menu */}
                <nav
                    className="mt-5 py-4 px-4 lg:mt-9 lg:px-6"
                    x-data="{selected: 'Dashboard'}"
                    x-init="selected = JSON.parse(localStorage.getItem('selected'));$watch('selected', value => localStorage.setItem('selected', JSON.stringify(value)))"
                >
                    {/* Menu group */}
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2">MENU</h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <Link to={'/'} className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                                    <FontAwesomeIcon icon={faCubes} />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to={'/transacciones'} className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                                    <FontAwesomeIcon icon={faMoneyBillTransfer} />
                                    Transacciones
                                </Link>
                            </li>
                            <li>
                                <Link to={'/tarjetas'} className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                                    <FontAwesomeIcon icon={faCreditCard} />
                                    Tarjetas
                                </Link>
                            </li>
                            <li>
                                <Link to={'/transferencias'} className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                                    <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                                    Transferencias
                                </Link>
                            </li>
                            <li>
                                <Link to={'/control-de-gastos'} className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                                    <FontAwesomeIcon icon={faHandHoldingDollar} />
                                    Control de gastos
                                </Link>
                            </li>
                            <li>
                                <Link to={'/perfil'} className="group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                                    <FontAwesomeIcon icon={faCircleUser} />
                                    Perfil
                                </Link>
                            </li>
                        </ul >
                    </div >
                </nav >
            </div >
            <div className="mx-5 border-t border-body py-8">
                <Link to={'/perfil'} className="flex items-center gap-4 p-5" href="#">
                    <span className="h-12 w-12 rounded-full">
                        <img src={avatar} alt="User" />
                    </span>
                    <span className="hidden text-left lg:block">
                        <span className="block font-medium text-black dark:text-white">{user.names}</span>
                        <span className="block text-sm font-medium text-white">{user.email}</span>
                    </span>
                </Link>
                <Link to={'/login'} onClick={() => { logout() }} className="group relative flex items-center gap-2.5 rounded-sm py-2 px-5 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4">
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                    Salir
                </Link>
            </div >
        </aside >
    )
}
export default Sidebar;