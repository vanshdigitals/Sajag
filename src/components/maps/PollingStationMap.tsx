import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import styles from '@/app/locator/page.module.css';

interface Booth {
  id: number;
  name: string;
  address: string;
  distance: string;
  time: string;
  accessibility: boolean;
  parking: boolean;
}

interface PollingStationMapProps {
  mockBooths: Booth[];
  selectedBooth: Booth;
  onSelectBooth: (booth: Booth) => void;
}

const PollingStationMap: React.FC<PollingStationMapProps> = memo(({ mockBooths, selectedBooth, onSelectBooth }) => {
  return (
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
          onClick={() => onSelectBooth(booth)}
          whileHover={{ scale: 1.2 }}
        >
          <MapPin size={24} />
        </motion.div>
      ))}
      <div className={styles.mapOverlay}>
        <span>Map View (Simulated)</span>
      </div>
    </div>
  );
});

PollingStationMap.displayName = 'PollingStationMap';

export default PollingStationMap;
