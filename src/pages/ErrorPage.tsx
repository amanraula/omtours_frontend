import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

interface ErrorPageProps {
  code?: number;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ 
  code = 404, 
  message = "We couldn't find the page you're looking for" 
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <AlertCircle className="w-20 h-20 text-sky-500 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">{code}</h1>
          <p className="text-xl text-gray-600 mb-8">{message}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 transition-colors duration-200"
            >
              <Home className="w-5 h-5" />
              Return Home
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>Need assistance? <a href="mailto:amanraula2005@gmail.com" className="text-sky-600 hover:text-sky-700">Contact our support team</a></p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;