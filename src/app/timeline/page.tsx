'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, Filter, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import styles from './page.module.css';

const timelineData = [
  { date: 'Jan 15, 2026', title: 'Official Notification', desc: 'Election Commission announces the full schedule.', status: 'completed' },
  { date: 'Feb 1–7, 2026', title: 'Nomination Filing', desc: 'Candidates file their nominations in various constituencies.', status: 'completed' },
  { date: 'Feb 10, 2026', title: 'Scrutiny of Nominations', desc: 'Verification of candidate documents by ECI.', status: 'completed' },
  { date: 'Feb 12, 2026', title: 'Withdrawal of Candidature', desc: 'Last day for candidates to withdraw their names.', status: 'active' },
  { date: 'Mar 10, 2026', title: 'Polling Day (Phase 1)', desc: 'Voting begins across 102 constituencies.', status: 'upcoming' },
  { date: 'Apr 25, 2026', title: 'Polling Day (Phase 2)', desc: 'Voting continues in the second phase.', status: 'upcoming' },
  { date: 'May 15, 2026', title: 'Counting of Votes', desc: 'The final results are tallied and announced.', status: 'upcoming' },
];

const Timeline = () => {
  const [filter, setFilter] = useState('all');

  const filteredData = timelineData.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Election Timeline 2026</h1>
        <p>Stay updated with the key phases of the upcoming election.</p>
      </header>

      <div className={styles.controls}>
        <div className={styles.filterPills}>
          {['all', 'completed', 'active', 'upcoming'].map((f) => (
            <button 
              key={f} 
              className={`${styles.pill} ${filter === f ? styles.activePill : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.timeline}>
        {filteredData.map((item, i) => (
          <motion.div 
            key={i} 
            className={styles.timelineItem}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={styles.timelineMarker}>
              <div className={`${styles.markerDot} ${styles[item.status]}`} />
              {i !== filteredData.length - 1 && <div className={styles.markerLine} />}
            </div>
            
            <Card className={styles.timelineCard}>
              <CardContent className={styles.cardContent}>
                <div className={styles.dateBadge}>{item.date}</div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.desc}>{item.desc}</p>
                <div className={`${styles.statusLabel} ${styles[item.status + 'Label']}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
