/**
 * Example usage of environment variables in your application
 * This file demonstrates how to use the environment configuration
 */

import {
  config,
  apiUrl,
  isDevelopment,
  isProduction,
  mode,
} from '../config/env';

// Example: Configure axios with environment-based API URL
export const createApiClient = () => {
  const baseURL = apiUrl;

  console.log(`🌍 Environment: ${mode}`);
  console.log(`🔗 API URL: ${baseURL}`);
  console.log(`🐛 Debug mode: ${config.debug}`);

  // You can use this configuration with axios or fetch
  return {
    baseURL,
    timeout: isDevelopment ? 10000 : 5000,
    headers: {      'Content-Type': 'application/json'  },
  };
};

// Example: Environment-specific behavior
export const getFeatureFlags = () => {
  return {
    enableDevTools: isDevelopment,
    enableAnalytics: isProduction,
    enableDebugLogs: config.debug,
    apiUrl: apiUrl,
  };
};

// Example: Log environment information
export const logEnvironmentInfo = () => {
  if (config.debug) {
    console.group('🔧 Environment Configuration');
    console.log('Mode:', mode);
    console.log('Development:', isDevelopment);
    console.log('Production:', isProduction);
    console.log('API URL:', apiUrl);
    console.log('App Name:', config.appName);
    console.log('App Version:', config.appVersion);
    console.log('Debug Mode:', config.debug);
    console.groupEnd();
  }
};

// Example: Validate required environment variables
export const validateEnvironment = () => {
  const requiredVars = ['VITE_API_URL', 'VITE_APP_NAME', 'VITE_APP_VERSION'];
  const missing = requiredVars.filter((varName) => !import.meta.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }

  return true;
};
