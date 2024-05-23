import Link from "next/link";
import styles from "./Header.module.css";
import { cookies } from "next/headers";

export default function Header() {
  const isSignedIn = cookies().get("Authorization");
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link id={styles.logo} href="/">
          <img src="/images/Silicon-Logotype-Light-Mode.svg" alt="" />
        </Link>
        <div id={styles.menu}>
          <nav className={styles.nav}>
            <Link className="menu-link" href="/">
              Home
            </Link>

              <Link className="menu-link" href="/">
                Users
              </Link>
            
              {/* <Link className="menu-link" href="/">
                Subscribers
              </Link> */}
            
            <Link className="menu-link" href="/courses">
              Courses
            </Link>
          </nav>
        </div>

        <div className={styles.accountButtons}>
          {isSignedIn ? (
            <Link className="btn btn-theme" href="/signout">
              <i className="fa-regular fa-user"></i>
              <span>Sign out</span>
            </Link>
          ) : (
            <>
              <Link className="btn btn-gray" href="/signin">
                <i className="fa-regular fa-right-to-bracket"></i>
                <span>Sign in</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
