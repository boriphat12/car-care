import { Link } from "react-router-dom"
import styles from "./css/Navbar.module.css"

const Navbar = () => {

    return (
        <div className={styles.navbar}>
            <Link className={styles.link} to="/" >Home</Link>
            <Link className={styles.link} to="/create">Add</Link>
        </div>
    )
}

export default Navbar;