// Mock federated module loader for demonstration
// In a real application, you would use @module-federation/vite or similar

import { PatternFlyTable, PatternFlyTableProps, TableColumn } from '@poc/lib';

export const loadPatternFlyTable = async () => {
  // Simulate async loading
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    PatternFlyTable,
  };
};

// For demonstration, we'll also export the direct import
export { PatternFlyTable };
export type { PatternFlyTableProps, TableColumn };

