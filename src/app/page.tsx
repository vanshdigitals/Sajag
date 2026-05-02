'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import styles from './page.module.css';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className={styles.badge}>
            <Sparkles size={16} />
            <span>Empowering 100k+ Indian Voters</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className={styles.title}>
            Understand Elections. <br />
            <span className={styles.gradientText}>Vote with Confidence.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className={styles.subtitle}>
            Sajag is your personal assistant for the Indian election process. 
            From eligibility to the polling booth, we guide you every step of the way.
          </motion.p>
          
          <motion.div variants={itemVariants} className={styles.ctaGroup}>
            <Link href="/guide">
              <Button size="lg" className={styles.primaryCta}>
                Start Your Journey <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/locator">
              <Button variant="outline" size="lg">
                Find Your Booth
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Why use Sajag?</h2>
          <p>Everything you need to be an informed citizen.</p>
        </div>
        
        <div className={styles.featureGrid}>
          {[
            { icon: CheckCircle, title: 'Step-by-Step Guide', desc: '5 simple steps to complete your voting journey.' },
            { icon: MapPin, title: 'Booth Locator', desc: 'Find your polling station with live navigation.' },
            { icon: Calendar, title: 'Live Timeline', desc: 'Stay updated with election dates in your state.' },
            { icon: Sparkles, title: 'AI Assistant', desc: 'Ask anything and get simple, clear explanations.' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              className={styles.featureCard}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.featureIcon}>
                <feature.icon size={24} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className={styles.trust}>
        <p>Powered by Official Election Commission Data</p>
        <div className={styles.trustBadges}>
          <span>✓ Secure</span>
          <span>✓ Anonymous</span>
          <span>✓ Non-partisan</span>
        </div>
      </section>
    </div>
  );
}
