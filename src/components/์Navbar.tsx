import { Link } from "react-router-dom"
import styles from "./css/Navbar.module.css"
import { useState } from "react"
import CarForm from "./CarForm";

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false)
    return (
        <>
            <div className={styles.navbar}>
                <Link className={styles.link} to="/">Home</Link>
                <button className={`${styles.link} ${styles.addButton}`} onClick={handleOpenModal}>
                    Add
                </button>
            </div>

            {showModal && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
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