import { AlertCircle, Leaf, Bug, Activity, Droplet } from 'lucide-react';

export default function DiseaseCard({ disease, info }) {
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'very high':
        return 'bg-red-200 text-red-700';
      case 'high':
        return 'bg-red-100 text-red-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'low':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-green-100 text-green-600';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'fungal':
        return <Leaf className="w-5 h-5 text-purple-600" />;
      case 'bacterial':
        return <Droplet className="w-5 h-5 text-orange-600" />;
      case 'viral':
        return <Activity className="w-5 h-5 text-pink-600" />;
      case 'pest':
        return <Bug className="w-5 h-5 text-brown-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-primary" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'fungal':
        return 'text-purple-600 bg-purple-50';
      case 'bacterial':
        return 'text-orange-600 bg-orange-50';
      case 'viral':
        return 'text-pink-600 bg-pink-50';
      case 'pest':
        return 'text-brown-600 bg-brown-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getCategoryIcon(info.category)}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{disease}</h3>
            {info.scientific_name && (
              <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-1">
                {info.scientific_name}
              </p>
            )}
          </div>
        </div>
        {info.severity && (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(info.severity)}`}>
            {info.severity}
          </span>
        )}
      </div>

      {/* Category Badge */}
      {info.category && info.category !== 'None' && (
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${getCategoryColor(info.category)}`}>
          {info.category}
        </div>
      )}

      {/* Affected Parts */}
      {info.affected_parts && info.affected_parts.length > 0 && (
        <div className="mb-3">
          <h4 className="font-semibold text-sm mb-1 text-gray-900 dark:text-white">Affected Parts:</h4>
          <div className="flex flex-wrap gap-1">
            {info.affected_parts.map((part, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
              >
                {part}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Symptoms */}
      {info.symptoms && info.symptoms.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Symptoms:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {info.symptoms.slice(0, 3).map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
            {info.symptoms.length > 3 && (
              <li className="text-gray-500 dark:text-gray-400 italic">
                +{info.symptoms.length - 3} more...
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Treatment */}
      {info.treatment && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Treatment:</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{info.treatment}</p>
        </div>
      )}

      {/* Prevention */}
      {info.prevention && (
        <div>
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Prevention:</h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{info.prevention}</p>
        </div>
      )}
    </div>
  );
}
