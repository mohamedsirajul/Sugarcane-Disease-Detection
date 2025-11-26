import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

export default function History() {
  const { t } = useTranslation();
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const history = JSON.parse(localStorage.getItem('predictions') || '[]');
    setPredictions(history);
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      localStorage.setItem('predictions', '[]');
      setPredictions([]);
    }
  };

  const deleteItem = (index) => {
    const newPredictions = predictions.filter((_, i) => i !== index);
    localStorage.setItem('predictions', JSON.stringify(newPredictions));
    setPredictions(newPredictions);
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'very high':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'high':
        return 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400';
      case 'low':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400';
      default:
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400';
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'fungal':
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400';
      case 'bacterial':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400';
      case 'viral':
        return 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-400';
      case 'pest':
        return 'bg-brown-100 text-brown-600 dark:bg-brown-900 dark:text-brown-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('history.title')}
        </h1>
        {predictions.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t('history.clear')}</span>
          </button>
        )}
      </div>

      {predictions.length === 0 ? (
        <div className="text-center py-16">
          <AlertCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('history.noHistory')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image - Larger for better visibility */}
                  {prediction.image && (
                    <div className="md:w-64 h-64 flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                      <img
                        src={prediction.image}
                        alt="Prediction"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-4">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3 flex-1">
                        {prediction.disease === 'Healthy' ? (
                          <CheckCircle className="w-7 h-7 text-green-500 flex-shrink-0 mt-1" />
                        ) : (
                          <AlertCircle className="w-7 h-7 text-red-500 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {prediction.disease}
                          </h3>
                          {prediction.scientific_name && prediction.scientific_name !== 'Unknown' && (
                            <p className="text-sm italic text-gray-600 dark:text-gray-400">
                              {prediction.scientific_name}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteItem(index)}
                        className="text-red-500 hover:text-red-600 ml-2 flex-shrink-0"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Badges Row */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-lg font-semibold text-primary">
                        Confidence: {prediction.confidence}%
                      </span>
                      {prediction.severity && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(prediction.severity)}`}>
                          {prediction.severity}
                        </span>
                      )}
                      {prediction.category && prediction.category !== 'None' && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(prediction.category)}`}>
                          {prediction.category}
                        </span>
                      )}
                    </div>

                    {/* Affected Parts */}
                    {prediction.affected_parts && prediction.affected_parts.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Affected Parts:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {prediction.affected_parts.map((part, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                            >
                              {part}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Symptoms */}
                    {prediction.symptoms && prediction.symptoms.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Symptoms:
                        </p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1">
                          {prediction.symptoms.map((symptom, i) => (
                            <li key={i}>{symptom}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Treatment - Always visible */}
                    {prediction.treatment && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Treatment:
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {prediction.treatment}
                        </p>
                      </div>
                    )}

                    {/* Prevention - Always visible */}
                    {prediction.prevention && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Prevention:
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {prediction.prevention}
                        </p>
                      </div>
                    )}

                    {/* Footer Row */}
                    <div className="pt-3 border-t dark:border-gray-700">
                      {prediction.timestamp && (
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(prediction.timestamp).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      )}
    </div>
  );
}
