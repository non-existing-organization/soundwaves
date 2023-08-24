import AsyncStorage from '@react-native-async-storage/async-storage';

/** Key used to store and retrieve app settings from AsyncStorage. */
const SETTINGS_KEY = 'app_settings';

/**
 * Retrieve settings from AsyncStorage.
 *
 * @async
 * @function
 * @returns {Promise<Object>} The settings object. Returns an empty object if no settings exist or an error occurs.
 *
 * @example
 * const appSettings = await getSettings();
 */
export const getSettings = async () => {
  try {
    const settingsString = await AsyncStorage.getItem(SETTINGS_KEY);
    return settingsString ? JSON.parse(settingsString) : {};
  } catch (error) {
    console.error('Error getting settings:', error);
    return {};
  }
};

/**
 * Update a specific setting key with a given value in AsyncStorage.
 *
 * @async
 * @function
 * @param {string} key - The key of the setting to update.
 * @param {*} value - The new value for the setting.
 *
 * @example
 * await updateSetting('theme', 'dark');
 */
export const updateSetting = async (key, value) => {
  try {
    const settings = await getSettings();
    settings[key] = value;
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error updating setting:', error);
  }
};

/**
 * Clear all settings from AsyncStorage.
 *
 * @async
 * @function
 *
 * @example
 * await clearAllSettings();
 */
export const clearAllSettings = async () => {
  try {
    await AsyncStorage.removeItem(SETTINGS_KEY);
  } catch (error) {
    console.error('Error clearing settings:', error);
  }
};
