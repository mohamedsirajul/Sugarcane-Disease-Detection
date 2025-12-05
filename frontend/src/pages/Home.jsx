import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Languages, Target } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {t('home.welcome')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('home.description')}
          </p>
          <Link
            to="/detection"
            className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary transition-colors shadow-lg hover:shadow-xl"
          >
            <span>{t('home.getStarted')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {t('home.features.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={Zap}
              title={t('home.features.instant')}
              description={t('home.features.instantDesc')}
            />
            <FeatureCard
              icon={Languages}
              title={t('home.features.multilingual')}
              description={t('home.features.multilingualDesc')}
            />
            <FeatureCard
              icon={Target}
              title={t('home.features.accurate')}
              description={t('home.features.accurateDesc')}
            />
          </div>
        </div>

        {/* Disease Info Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Detected Diseases
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <DiseaseTag name="Red Rot" severity="high" />
            <DiseaseTag name="Smut" severity="medium" />
            <DiseaseTag name="Rust" severity="medium" />
            <DiseaseTag name="Leaf Scald" severity="high" />
            <DiseaseTag name="Mosaic Virus" severity="high" />
            <DiseaseTag name="Healthy" severity="none" />
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/diseases"
              className="text-primary hover:text-secondary font-semibold inline-flex items-center space-x-1"
            >
              <span>Learn more about diseases</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col items-center text-center">
        <div className="bg-primary/10 dark:bg-primary/20 rounded-full p-4 mb-4">
          <Icon className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function DiseaseTag({ name, severity }) {
  const colors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-blue-100 text-blue-700',
    none: 'bg-green-100 text-green-700',
  };

  return (
    <div className={`${colors[severity]} px-4 py-2 rounded-md text-center font-medium`}>
      {name}
    </div>
  );
}
