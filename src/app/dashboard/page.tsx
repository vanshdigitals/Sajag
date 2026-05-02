'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, Calendar, MessageSquare, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useProgressStore } from '@/store/useProgressStore';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import styles from './page.module.css';

const Dashboard = () => {
  const { steps, currentStepIndex } = useProgressStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const progressSnapshot = await getDocs(collection(db, 'users', user.uid, 'progress'));
          progressSnapshot.forEach((docSnap) => {
            const stepId = docSnap.id;
            const data = docSnap.data();
            if (data.completed) {
              const idx = steps.findIndex(s => s.id === stepId);
              if (idx !== -1 && !steps[idx].isCompleted) {
                // To avoid multiple re-renders or stale state in a loop,
                // Zustand setStepCompleted handles it safely.
                setStepCompleted(idx, true);
              }
            }
          });
        } catch (error) {
          console.error("Error fetching progress from Firestore", error);
        }
      }
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  const completedSteps = steps.filter(s => s.isCompleted).length;
  const progressPercent = Math.round((completedSteps / steps.length) * 100);

  const quickActions = [
    { icon: BookOpen, label: 'Election Guide', href: '/guide', color: '#4f46e5' },
    { icon: MapPin, label: 'Booth Locator', href: '/locator', color: '#10b981' },
    { icon: Calendar, label: 'Timeline', href: '/timeline', color: '#f59e0b' },
    { icon: MessageSquare, label: 'AI Assistant', href: '/assistant', color: '#ec4899' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome back!</h1>
        <p>You're {progressPercent}% ready for the election.</p>
      </header>

      <div className={styles.grid}>
        {/* Progress Card */}
        <Card className={styles.progressCard}>
          <CardContent className={styles.progressContent}>
            <div className={styles.circularProgress}>
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className={styles.progressTrack} />
                <motion.circle 
                  cx="50" cy="50" r="45" 
                  className={styles.progressFill}
                  initial={{ strokeDasharray: "0 283" }}
                  animate={{ strokeDasharray: `${(progressPercent / 100) * 283} 283` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className={styles.progressText}>
                <span className={styles.percent}>{progressPercent}%</span>
                <span className={styles.label}>Complete</span>
              </div>
            </div>
            <div className={styles.progressInfo}>
              <h3>{completedSteps} of {steps.length} steps finished</h3>
              <Button href="/guide" className={styles.continueBtn}>
                Continue Learning <ChevronRight size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className={styles.actionsGrid}>
          {quickActions.map((action, i) => (
            <Card key={i} className={styles.actionCard}>
              <CardContent className={styles.actionContent}>
                <div className={styles.actionIcon} style={{ backgroundColor: `${action.color}15`, color: action.color }}>
                  <action.icon size={24} />
                </div>
                <span>{action.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className={styles.activityCard}>
          <CardHeader>
            <CardTitle>Recent Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.activityList}>
              {steps.map((step, i) => (
                <div key={i} className={`${styles.activityItem} ${step.isCompleted ? styles.completed : ''}`}>
                  <div className={styles.activityIcon}>
                    {step.isCompleted ? <CheckCircle2 size={18} /> : <div className={styles.dot} />}
                  </div>
                  <div className={styles.activityText}>
                    <p className={styles.stepTitle}>Step {i + 1}: {step.id.charAt(0).toUpperCase() + step.id.slice(1)}</p>
                    <p className={styles.stepStatus}>{step.isCompleted ? 'Completed' : 'In Progress'}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
