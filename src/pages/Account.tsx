import React, { useState } from 'react';
import { Moon, Sun, Trash2, MapPin } from 'lucide-react';
import { useAuthStore } from '../store/authUser'; // Add this import

const Account: React.FC = () => {
  const { user: authUser, authCheck, logout } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useState(true);

  React.useEffect(() => {
    authCheck();
  }, [authCheck]);

  // If no user is logged in, show login message
  if (!authUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-blue-200/50 shadow-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-blue-600">You need to be logged in to view your account.</p>
        </div>
      </div>
    );
  }

  const displayUser = {
    image: authUser.image,
    username: authUser.username ,
    email: authUser.email,
    //searchHistory: authUser.searchHistory || []
     searchHistory: ['sample1', 'sample2', 'sample3'] // Placeholder for search history,
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle account deletion logic here
      console.log('Account deletion requested');
      logout(); // Call logout from auth store
    }
  };

  const handleDeletePlace = (index: number) => {
    // This would need to be implemented in your auth store
    // For now, just show a message
    console.log(`Delete place at index ${index}: ${displayUser.searchHistory[index]}`);
    // You would call something like: updateUserSearchHistory(displayUser.searchHistory.filter((_, i) => i !== index))
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100'
    }`}>
      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-3 rounded-full transition-all duration-300 backdrop-blur-sm border-2 hover:scale-110 ${
            isDarkMode
              ? 'bg-slate-800/80 border-purple-400/50 text-purple-300 hover:bg-slate-700/80'
              : 'bg-white/80 border-blue-200/50 text-blue-600 hover:bg-white/90'
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          
          {/* Left Section - User Profile (1/3 width) */}
          <div className="lg:w-1/3">
            <div className={`rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 border-2 ${
              isDarkMode
                ? 'bg-slate-800/50 border-purple-500/30 shadow-2xl shadow-purple-500/10'
                : 'bg-white/70 border-blue-200/50 shadow-2xl shadow-blue-500/10'
            }`}>
              
              {/* Profile Image */}
              <div className="flex justify-center mb-6">
                <div className={`p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg ${
                  isDarkMode ? 'shadow-purple-500/25' : 'shadow-blue-500/25'
                }`}>
                  <img
                    src={displayUser.image}
                    alt={displayUser.username}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white"
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center space-y-4 mb-8">
                <h2 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  @{displayUser.username}
                </h2>
                <p className={`text-sm ${
                  isDarkMode ? 'text-purple-300' : 'text-blue-600'
                } bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full`}>
                  {displayUser.email}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isDarkMode
                      ? 'bg-blue-600/80 hover:bg-blue-500 text-white border-2 border-blue-500/50'
                      : 'bg-blue-500 hover:bg-blue-600 text-white border-2 border-blue-400'
                  } shadow-lg hover:shadow-xl`}
                >
                  Logout
                </button>

                <button
                  onClick={handleDeleteAccount}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                    isDarkMode
                      ? 'bg-red-600/80 hover:bg-red-500 text-white border-2 border-red-500/50'
                      : 'bg-red-500 hover:bg-red-600 text-white border-2 border-red-400'
                  } shadow-lg hover:shadow-xl`}
                >
                  <Trash2 size={18} />
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Familiar Places (2/3 width) */}
          <div className="lg:w-2/3">
            <div className={`rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 border-2 ${
              isDarkMode
                ? 'bg-slate-800/50 border-purple-500/30 shadow-2xl shadow-purple-500/10'
                : 'bg-white/70 border-blue-200/50 shadow-2xl shadow-blue-500/10'
            }`}>
              
              {/* Title */}
              <div className="mb-8">
                <h3 className={`text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                } flex items-center gap-3`}>
                  <MapPin className={`${
                    isDarkMode ? 'text-purple-400' : 'text-blue-500'
                  }`} size={32} />
                  Familiar Places
                </h3>
                <p className={`mt-2 ${
                  isDarkMode ? 'text-purple-300' : 'text-blue-600'
                }`}>
                  Your recent search history ({displayUser.searchHistory.length} places)
                </p>
              </div>

              {/* Places Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayUser.searchHistory.map((place: string, index: number) => (
                  <div
                    key={index}
                    className={`group relative p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 ${
                      isDarkMode
                        ? 'bg-slate-700/50 border-purple-400/30 hover:bg-slate-700/70 hover:border-purple-400/50'
                        : 'bg-white/60 border-blue-200/40 hover:bg-white/80 hover:border-blue-300/60'
                    } backdrop-blur-sm shadow-lg hover:shadow-xl`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isDarkMode
                            ? 'bg-purple-500/20 text-purple-300'
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          <MapPin size={16} />
                        </div>
                        <span className={`font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {place}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => handleDeletePlace(index)}
                        className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg hover:scale-110 ${
                          isDarkMode
                            ? 'text-red-400 hover:bg-red-500/20'
                            : 'text-red-500 hover:bg-red-100'
                        }`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {displayUser.searchHistory.length === 0 && (
                <div className={`text-center py-12 ${
                  isDarkMode ? 'text-purple-300' : 'text-blue-600'
                }`}>
                  <MapPin size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No places in your search history yet</p>
                  <p className="text-sm opacity-75 mt-2">Start exploring to see your familiar places here</p>
                </div>
                
              )}
            </div>
            <a
  href="https://github.com/amanraula"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-4 right-4 z-50 text-blue-400 hover:text-blue-600 font-semibold text-sm shadow-sm bg-white/80 rounded px-3 py-1"
>
  Github-Aman
</a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;