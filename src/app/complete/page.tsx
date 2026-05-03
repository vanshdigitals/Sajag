'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Share2, Calendar, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import styles from './page.module.css';

const CompletionPage = () => {
  const [certId, setCertId] = React.useState<string | null>(null);

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff8a00', '#e52e71', '#4f46e5', '#10b981']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff8a00', '#e52e71', '#4f46e5', '#10b981']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCertId(`SAJ-${Math.floor(Math.random() * 100000)}`);
  }, []);

  return (
    <div className={styles.container}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className={styles.content}
      >
        <div className={styles.iconWrapper}>
          <Trophy size={64} className={styles.trophyIcon} />
        </div>
        
        <h1 className={styles.title}>Congratulations!</h1>
        <p className={styles.subtitle}>
          You&apos;re officially prepared for the upcoming election.
        </p>

        <Card className={styles.certificate}>
          <CardContent className={styles.certContent}>
            <h3>Certificate of Readiness</h3>
            <p>This certifies that you have completed the Sajag Voter Guide.</p>
            <div className={styles.certFooter}>
              <span>Date: {new Date().toLocaleDateString()}</span>
              <span>ID: {certId || 'Generating...'}</span>
            </div>
          </CardContent>
        </Card>

        <div className={styles.actions}>
          <Button variant="outline" className={styles.actionBtn}>
            <Share2 size={18} style={{ marginRight: '0.5rem' }} /> Share Progress
          </Button>
          <Button variant="outline" className={styles.actionBtn}>
            <Calendar size={18} style={{ marginRight: '0.5rem' }} /> Add to Calendar
          </Button>
        </div>

        <div className={styles.nextSteps}>
          <h3>What&apos;s Next?</h3>
          <Button href="/dashboard" variant="ghost">
            Return to Dashboard <ArrowRight size={18} />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CompletionPage;
