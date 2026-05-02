'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User as UserIcon, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Save user data to Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: new Date().toISOString(),
        createdAt: user.metadata.creationTime || new Date().toISOString()
      }, { merge: true });
      
    } catch (error) {
      console.error("Sign in error", error);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Your Profile</h1>
        <p>Manage your account settings and preferences.</p>
      </header>

      {user ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%' }}
        >
          <Card className={styles.profileCard}>
            <CardContent>
              <div className={styles.avatar}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className={styles.avatarImg} />
                ) : (
                  user.displayName?.charAt(0).toUpperCase() || 'U'
                )}
              </div>
              <h2 className={styles.userName}>{user.displayName || 'Voter'}</h2>
              <p className={styles.userEmail}>{user.email}</p>
              
              <Button onClick={handleSignOut} variant="outline" className={styles.signOutBtn}>
                <LogOut size={18} style={{ marginRight: '0.5rem' }} /> Sign Out
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%' }}
        >
          <Card className={styles.unauthenticated}>
            <CardContent>
              <div className={styles.loginIcon}>
                <UserIcon size={32} />
              </div>
              <h2 className={styles.userName}>Not Signed In</h2>
              <p className={styles.userEmail}>Sign in to save your progress across devices.</p>
              
              <Button onClick={handleSignIn} className={styles.signInBtn}>
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google" 
                  width={20} 
                  style={{ marginRight: '0.75rem' }}
                />
                Sign in with Google
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ProfilePage;
