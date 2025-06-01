/**
 * Environment configuration
 * Provides type-safe access to environment variables
 */

interface Config {
  apiUrl: string;
  appName: string;
  appVersion: string;
  debug: boolean;
}

// Helper to safely get environment variables
const getEnvVar = (
  key: string,
  defaultValue: string = '',
  required: boolean = false
): string => {
  const value = import.meta.env[key];

  if (required && (value === undefined || value === '')) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value ?? defaultValue;
};

// Helper to parse boolean values
const parseBool = (value: string): boolean => {
  return value.toLowerCase() === 'true';
};

// Environment helpers
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
export const mode = import.meta.env.MODE;

// Export configuration object
export const config: Config = {
  // Example: Make API URL required in production
  apiUrl: getEnvVar('VITE_API_URL', 'http://localhost:3000', isProduction),
  appName: getEnvVar('VITE_APP_NAME', 'Charts Project'),
  appVersion: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  debug: parseBool(getEnvVar('VITE_DEBUG', 'false')),
};

// Export individual values for convenience
export const { apiUrl, appName, appVersion, debug } = config;

// Example: Validate critical environment variables
if (isProduction) {
  // Ensure critical variables are set in production
  getEnvVar('VITE_API_URL', '', true);
}

export default config;
