import { useEffect, useState } from 'react';

const apiUrl = process.env.BASE_URL;

const useGetAllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const title = {
      // Здесь можно добавить дополнительные заголовки, если требуется
    };

    const fetchArticles = async () => {
      try {
        const response = await fetch(`${apiUrl}/articles`, {
          method: 'GET',
          title,
        });

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchArticles();
  }, []);

  return { articles, error };
};

export default useGetAllArticles;