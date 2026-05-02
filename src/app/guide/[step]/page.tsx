'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useProgressStore } from '@/store/useProgressStore';
import { guideSteps } from '@/lib/guideData';
import { auth, db, logAppEvent } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import styles from './page.module.css';

const StepPage = () => {
  const { step: stepId } = useParams();
  const router = useRouter();
  const { steps, setStepCompleted, setChecklistItem, setCurrentStep } = useProgressStore();
  
  const stepIndex = guideSteps.findIndex(s => s.id === stepId);
  const stepContent = guideSteps[stepIndex];
  
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAskingAi, setIsAskingAi] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (stepIndex !== -1) setCurrentStep(stepIndex);
  }, [stepIndex, setCurrentStep]);

  if (!mounted || !stepContent) return null;

  const currentStepProgress = steps[stepIndex];
  const allItemsChecked = stepContent.checklist.every(item => currentStepProgress.checklist[item.id]);

  const handleToggleCheck = (itemId: string) => {
    setChecklistItem(stepIndex, itemId, !currentStepProgress.checklist[itemId]);
  };

  const handleAskAi = async () => {
    setIsAskingAi(true);

    const prompt = `
      You are an expert election assistant for Indian citizens. 
      Explain the following topic simply for a first-time voter: "${stepContent.title}".
      Context: ${stepContent.description}
      
      Rules:
      - Use simple analogies (like getting a library card or using an ATM).
      - Keep it under 3 sentences.
      - Be friendly and encouraging.
      - Avoid legal jargon.
    `;

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);
      
      setAiExplanation(data.text);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setAiExplanation("I'm sorry, I'm having trouble explaining that right now. Please try again later.");
    } finally {
      setIsAskingAi(false);
    }
  };

  const handleNext = () => {
    if (stepIndex < guideSteps.length - 1) {
      router.push(`/guide/${guideSteps[stepIndex + 1].id}`);
    } else {
      router.push('/complete');
    }
  };

  const handlePrevious = () => {
    if (stepIndex > 0) {
      router.push(`/guide/${guideSteps[stepIndex - 1].id}`);
    }
  };

  const handleComplete = async () => {
    setStepCompleted(stepIndex, true);
    
    // Log the event
    logAppEvent('step_completed', {
      step_id: stepContent.id,
      step_title: stepContent.title
    });

    if (auth.currentUser) {
      try {
        const progressRef = doc(db, 'users', auth.currentUser.uid, 'progress', stepContent.id);
        await setDoc(progressRef, {
          completed: true,
          completedAt: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        console.error("Failed to save progress to Firestore", error);
      }
    }
    
    handleNext();
  };

  return (
    <div className={styles.container}>
      {/* Progress Header */}
      <div className={styles.header}>
        <div className={styles.progressLabel}>
          <span>Step {stepIndex + 1} of {guideSteps.length}</span>
          <span>{Math.round(((stepIndex + 1) / guideSteps.length) * 100)}% Complete</span>
        </div>
        <div className={styles.progressBar}>
          <motion.div 
            className={styles.progressFill}
            initial={{ width: 0 }}
            animate={{ width: `${((stepIndex + 1) / guideSteps.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className={styles.content}
        >
          <header className={styles.stepTitle}>
            <h1>{stepContent.title}</h1>
            <p>{stepContent.subtitle}</p>
          </header>

          <Card className={styles.descriptionCard}>
            <CardContent>
              <p>{stepContent.description}</p>
              
              <Button 
                variant="outline" 
                size="sm" 
                className={styles.aiBtn} 
                onClick={handleAskAi}
                isLoading={isAskingAi}
              >
                <Sparkles size={16} /> Explain Simply
              </Button>

              {aiExplanation && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={styles.aiExplanation}
                >
                  <p>🤖 {aiExplanation}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>

          <section className={styles.checklistSection}>
            <h3>Your Checklist</h3>
            <div className={styles.checklist}>
              {stepContent.checklist.map((item) => (
                <label key={item.id} className={styles.checkItem}>
                  <input 
                    type="checkbox" 
                    checked={!!currentStepProgress.checklist[item.id]} 
                    onChange={() => handleToggleCheck(item.id)}
                  />
                  <span className={styles.checkText}>{item.label}</span>
                </label>
              ))}
            </div>
          </section>

          {stepContent.officialLink && (
            <div className={styles.officialLink}>
              <a href={stepContent.officialLink.url} target="_blank" rel="noopener noreferrer">
                {stepContent.officialLink.label} <ExternalLink size={14} />
              </a>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <footer className={styles.footer}>
        <div className={styles.navBtns}>
          <Button variant="ghost" onClick={handlePrevious} disabled={stepIndex === 0}>
            <ChevronLeft size={20} /> Previous
          </Button>
          
          {allItemsChecked ? (
            <Button onClick={handleComplete} className={styles.completeBtn}>
              Mark Complete & Continue <ChevronRight size={20} />
            </Button>
          ) : (
            <Button onClick={handleNext} variant="outline">
              Skip for now <ChevronRight size={20} />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default StepPage;
