'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Navigation, Info, Clock, Accessibility } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { logAppEvent } from '@/lib/firebase';
import styles from './page.module.css';

const mockBooths = [
  { id: 1, name: 'Government Model Sr. Sec. School', address: 'Sector 16, Chandigarh', distance: '1.2 km', time: '15 min walk', accessibility: true, parking: true },
  { id: 2, name: 'Community Center, Sector 15', address: 'V3 Road, Sector 15-A, Chandigarh', distance: '2.5 km', time: '8 min drive', accessibility: true, parking: false },
  { id: 3, name: 'Public Library Hall', address: 'Near Market, Sector 17, Chandigarh', distance: '3.1 km', time: '12 min drive', accessibility: false, parking: true },
];

const BoothLocator = () => {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [selectedBooth, setSelectedBooth] = useState(mockBooths[0]);

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <div className={styles.inputWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <input 
            type="text" 
            placeholder="Search by area, EPIC or PIN code..." 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setError(''); // Clear error on typing
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && search.trim()) {
                const term = search.trim();
                // If it looks like a PIN (6 chars) but has letters, show error
                if (term.length === 6 && !/^\d{6}$/.test(term)) {
                  setError('Invalid PIN code format. Please enter 6 digits.');
                  return;
                }
                logAppEvent('booth_search', { search_term: term });
              }
            }}
          />
        </div>
        {error && <p className={styles.errorText} role="alert" style={{ color: 'red', marginTop: '8px', fontSize: '14px' }}>{error}</p>}
      </div>

      <div className={styles.layout}>
        {/* Mock Map View */}
        <div className={styles.mapContainer}>
          <div className={styles.mockMap}>
            <div className={styles.userLocation}>
              <div className={styles.pulse} />
            </div>
            {mockBooths.map((booth) => (
              <motion.div 
                key={booth.id}
                className={`${styles.boothPin} ${selectedBooth.id === booth.id ? styles.selectedPin : ''}`}
                style={{ 
                  top: `${20 + booth.id * 15}%`, 
                  left: `${30 + booth.id * 10}%` 
                }}
                onClick={() => setSelectedBooth(booth)}
                whileHover={{ scale: 1.2 }}
              >
                <MapPin size={24} />
              </motion.div>
            ))}
            <div className={styles.mapOverlay}>
              <span>Map View (Simulated)</span>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className={styles.infoPanel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBooth.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className={styles.infoCard}>
                <CardContent className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconBox}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3>{selectedBooth.name}</h3>
                      <p className={styles.address}>{selectedBooth.address}</p>
                    </div>
                  </div>

                  <div className={styles.stats}>
                    <div className={styles.stat}>
                      <Navigation size={16} />
                      <span>{selectedBooth.distance}</span>
                    </div>
                    <div className={styles.stat}>
                      <Clock size={16} />
                      <span>{selectedBooth.time}</span>
                    </div>
                  </div>

                  <div className={styles.amenities}>
                    {selectedBooth.accessibility && (
                      <div className={styles.amenity}>
                        <Accessibility size={16} /> Wheelchair Access
                      </div>
                    )}
                    {selectedBooth.parking && (
                      <div className={styles.amenity}>
                        <Info size={16} /> Parking Available
                      </div>
                    )}
                  </div>

                  <div className={styles.actions}>
                    <Button className={styles.actionBtn}>
                      Get Directions
                    </Button>
                    <Button variant="outline" className={styles.actionBtn}>
                      Call Booth Officer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className={styles.nearbyList}>
            <h4>Nearby Polling Stations</h4>
            {mockBooths.map((booth) => (
              <div 
                key={booth.id} 
                className={`${styles.nearbyItem} ${selectedBooth.id === booth.id ? styles.activeItem : ''}`}
                onClick={() => setSelectedBooth(booth)}
              >
                <div className={styles.nearbyInfo}>
                  <p className={styles.nearbyName}>{booth.name}</p>
                  <p className={styles.nearbyDist}>{booth.distance} away</p>
                </div>
                <ChevronRight size={16} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import { AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default BoothLocator;
