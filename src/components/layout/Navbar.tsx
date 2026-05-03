'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>SAJAG</span>
        </Link>
        
        <div className={styles.links}>
          <Link href="/dashboard" className={`${styles.link} ${pathname === '/dashboard' ? styles.active : ''}`}>
            Dashboard
          </Link>
          <Link href="/guide" className={`${styles.link} ${pathname.startsWith('/guide') ? styles.active : ''}`}>
            Guide
          </Link>
          <Link href="/timeline" className={`${styles.link} ${pathname === '/timeline' ? styles.active : ''}`}>
            Timeline
          </Link>
          <Link href="/locator" className={`${styles.link} ${pathname === '/locator' ? styles.active : ''}`}>
            Booth Locator
          </Link>
        </div>

        <div className={styles.actions}>
          <button className={styles.profileBtn}>
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
