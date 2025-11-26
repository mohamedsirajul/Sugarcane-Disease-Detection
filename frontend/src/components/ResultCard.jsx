import { useTranslation } from 'react-i18next';
import { AlertCircle, CheckCircle, Download, Copy, Info } from 'lucide-react';

export default function ResultCard({ result, image, onDownload, onCopy }) {
  const { t } = useTranslation();

  if (!result) return null;

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'very high':
        return 'text-red-700 bg-red-200';
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'fungal':
        return 'text-purple-600 bg-purple-100';
      case 'bacterial':
        return 'text-orange-600 bg-orange-100';
      case 'viral':
        return 'text-pink-600 bg-pink-100';
      case 'pest':
        return 'text-brown-600 bg-brown-100';
      case 'nutritional':
        return 'text-yellow-600 bg-yellow-100';
      case 'environmental':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {result.disease === 'Healthy' ? (
            <CheckCircle className="w-8 h-8 text-green-500 mt-1" />
          ) : (
            <AlertCircle className="w-8 h-8 text-red-500 mt-1" />
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {result.disease}
            </h2>
            {result.scientific_name && result.scientific_name !== 'Unknown' && (
              <p className="text-sm italic text-gray-600 dark:text-gray-400 mt-1">
                {result.scientific_name}
              </p>
            )}
            <div className="flex items-center flex-wrap gap-2 mt-2">
              <span className={`text-lg font-semibold ${getConfidenceColor(result.confidence)}`}>
                {t('detection.confidence')}: {result.confidence}%
              </span>
              {result.severity && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(result.severity)}`}>
                  {result.severity}
                </span>
              )}
              {result.category && result.category !== 'None' && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(result.category)}`}>
                  {result.category}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Database Info Badge */}
      {result.database_info && !result.database_info.in_database && (
        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-3 flex items-start space-x-2">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {result.database_info.note || 'New disease detected but not in reference database'}
          </p>
        </div>
      )}

      {/* Image */}
      {image && (
        <div className="rounded-xl overflow-hidden shadow-md border-2 border-gray-200 dark:border-gray-700">
          <img
            src={image}
            alt="Analyzed"
            className="w-full h-80 object-contain bg-gray-50 dark:bg-gray-900"
          />
        </div>
      )}

      {/* Affected Parts */}
      {result.affected_parts && result.affected_parts.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Affected Parts
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.affected_parts.map((part, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                {part}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Symptoms */}
      {result.symptoms && result.symptoms.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            {t('detection.symptoms')}
          </h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            {result.symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Treatment */}
      {result.treatment && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            {t('detection.treatment')}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{result.treatment}</p>
        </div>
      )}

      {/* Prevention */}
      {result.prevention && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            {t('detection.prevention')}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{result.prevention}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-6 border-t-2 dark:border-gray-700">
        <button
          onClick={onDownload}
          className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-secondary transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md font-semibold"
        >
          <Download className="w-5 h-5" />
          <span>{t('detection.download')}</span>
        </button>
        <button
          onClick={onCopy}
          className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md font-semibold"
        >
          <Copy className="w-5 h-5" />
          <span>{t('detection.copyText')}</span>
        </button>
      </div>
    </div>
  );
}
