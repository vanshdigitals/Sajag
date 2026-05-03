'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { auth, db } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const LoginPage = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
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

      router.push('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className={styles.container}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.content}
      >
        <div className={styles.logo}>SAJAG</div>
        <h1>Stay aware. Vote with clarity.</h1>
        <p>Sign in to save your progress and get election reminders.</p>

        <Card className={styles.loginCard}>
          <CardContent className={styles.cardContent}>
            <Button onClick={handleGoogleLogin} variant="outline" className={styles.googleBtn}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={20} />
              Continue with Google
            </Button>
            
            <div className={styles.divider}>
              <span>or</span>
            </div>

            <Button href="/dashboard" variant="ghost" className={styles.guestBtn}>
              Continue as Guest <ArrowRight size={18} />
            </Button>
          </CardContent>
        </Card>

        <div className={styles.security}>
          <ShieldCheck size={16} />
          <span>Secure, anonymous & non-partisan</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
