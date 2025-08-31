import { useEffect, useState } from 'react';
import { useSegments } from 'expo-router';

export function useNavigationHistory() {
  const segments = useSegments();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory((prev) => [...prev, segments.join('/')]);
  }, [segments]);

  return { history };
}
