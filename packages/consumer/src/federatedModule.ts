// Mock federated module loader for demonstration
// In a real application, you would use @module-federation/vite or similar

import { PatternFlyTable, PatternFlyTableProps } from '@poc/lib';

export const loadPatternFlyTable = async () => {
  // Simulate async loading
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    PatternFlyTable,
  };
};

export type { PatternFlyTableProps };

