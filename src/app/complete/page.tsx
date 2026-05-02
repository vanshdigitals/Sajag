'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Share2, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import styles from './page.module.css';

const CompletionPage = () => {
  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#4f46e5', '#ec4899']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4f46e5', '#ec4899']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }, []);

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.content}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
      >
        <div className={styles.trophyIcon}>
          <Trophy size={64} />
        </div>

        <h1 className={styles.title}>Congratulations!</h1>
        <p className={styles.subtitle}>
          You've completed all 5 steps of your election journey. 
          You are now ready to vote with confidence!
        </p>

        <Card className={styles.certificateCard}>
          <CardContent className={styles.certContent}>
            <div className={styles.certHeader}>
              <div className={styles.certLogo}>SAJAG</div>
              <div className={styles.certBadge}>Champion</div>
            </div>
            <div className={styles.certBody}>
              <p className={styles.certLabel}>This is to certify that you are</p>
              <h2 className={styles.certName}>A Responsible Indian Citizen</h2>
              <p className={styles.certDesc}>Successfully completed the Sajag Voter Education Program.</p>
            </div>
            <div className={styles.certFooter}>
              <span>Date: {new Date().toLocaleDateString()}</span>
              <span>ID: SAJ-{Math.floor(Math.random() * 100000)}</span>
            </div>
          </CardContent>
        </Card>

        <div className={styles.actions}>
          <Button className={styles.actionBtn}>
            <Share2 size={18} /> Share Your Achievement
          </Button>
          <Button variant="outline" className={styles.actionBtn}>
            <Calendar size={18} /> Set a Voting Day Reminder
          </Button>
        </div>

        <div className={styles.nextSteps}>
          <p>What's next?</p>
          <Button href="/dashboard" variant="ghost">
            Return to Dashboard <ArrowRight size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CompletionPage;
