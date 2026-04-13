import { useEffect, useState } from 'react';
import { getDefaultPortfolioContent, getPortfolioContent } from '../services/content/contentService';

export const usePortfolioContent = () => {
  const [content, setContent] = useState(getDefaultPortfolioContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      const data = await getPortfolioContent();

      if (isMounted) {
        setContent(data);
        setIsLoading(false);
      }
    };

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    content,
    isLoading,
  };
};
