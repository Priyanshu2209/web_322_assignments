// Import the Lego sets and themes data from JSON files located in the data folder
const setData = require('./data/setData.json');
const themeData = require('./data/themeData.json');

/**
 * Get all Lego sets along with their corresponding theme names.
 * @returns {Array} Array of Lego sets with theme names.
 */
const getAllSets = () => {
  return setData.map(set => {
    const theme = themeData.find(t => t.id === set.theme_id);
    return {
      ...set,
      theme_name: theme ? theme.name : 'Unknown' // Include theme name or 'Unknown'
    };
  });
};

/**
 * Get Lego sets filtered by theme name.
 * @param {string} themeName - The name of the theme to filter by.
 * @returns {Array} Array of Lego sets that belong to the specified theme.
 */
const getSetsByTheme = (themeName) => {
  // Find the theme object based on the provided name (case-insensitive)
  const themeObj = themeData.find(t => t.name.toLowerCase() === themeName.toLowerCase());
  if (!themeObj) {
    return []; // If theme not found, return an empty array
  }
  // Return sets that match the theme ID
  return setData.filter(set => set.theme_id === themeObj.id);
};

/**
 * Get a specific Lego set by its set number.
 * @param {string} setNumber - The set number to look for.
 * @returns {Object|null} The Lego set object if found, or null if not found.
 */
const getSetBySetNumber = (setNumber) => {
  const set = setData.find(s => s.set_num === setNumber);
  if (!set) {
    return null; // If set not found, return null
  }
  // Find the theme object for the set
  const theme = themeData.find(t => t.id === set.theme_id);
  return {
    ...set,
    theme_name: theme ? theme.name : 'Unknown' // Include theme name or 'Unknown'
  };
};

// Export the functions for use in other modules
module.exports = {
  getAllSets,
  getSetsByTheme,
  getSetBySetNumber
};
