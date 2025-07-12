import { Link, useNavigate } from "react-router-dom"
import styles from "./css/Navbar.module.css"
import { useState } from "react"
import CarForm from "./CarForm";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../features/auths/authSlice";

const Navbar = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false)
    const handleLogout = () => {
        dispatch(logout());
        navigate("/")
    }
    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.leftSection}>
                    <Link className={styles.link} to="/">Home</Link>
                </div>
            
                <div className={styles.rightSection}>
                    {auth.token && 
                        <button
                            className={`${styles.link} ${styles.addButton}`}
                            onClick={handleOpenModal}
                        >
                            Add
                        </button>
                    }
                    {auth.token &&
                        <Link className={styles.link} to="/carlist">Cars</Link>
                    }
                    {auth.token &&
                         <button className={`${styles.link} ${styles.logoutButton}`} onClick={handleLogout}>
                            Logout
                        </button>
                    }
                    {!auth.token && (
                        <Link className={styles.link} to="/login">Login</Link>
                    )}
                </div>
            </div>

            {showModal && (
                <div 
                    className={styles.modalOverlay} 
                    onClick={handleCloseModal}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        <CarForm onClose={handleCloseModal} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;