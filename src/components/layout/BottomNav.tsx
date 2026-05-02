'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Calendar, MapPin, User } from 'lucide-react';
import styles from './BottomNav.module.css';

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/dashboard' },
    { icon: BookOpen, label: 'Guide', href: '/guide' },
    { icon: Calendar, label: 'Timeline', href: '/timeline' },
    { icon: MapPin, label: 'Booth', href: '/locator' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <div className={styles.bottomNav}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href === '/guide' && pathname.startsWith('/guide'));
        
        return (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <Icon size={24} />
            <span className={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
