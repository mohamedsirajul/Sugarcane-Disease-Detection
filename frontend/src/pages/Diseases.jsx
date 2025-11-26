import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DiseaseCard from '../components/DiseaseCard';
import { Loader2 } from 'lucide-react';

export default function Diseases() {
  const { t } = useTranslation();
  const [diseases, setDiseases] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const response = await fetch('/api/diseases');
      const data = await response.json();
      setDiseases(data.diseases);
    } catch (error) {
      console.error('Failed to fetch diseases:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        {t('diseases.title')}
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diseases &&
          Object.entries(diseases).map(([name, info]) => (
            <DiseaseCard key={name} disease={name} info={info} />
          ))}
      </div>
    </div>
  );
}
