/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Priyanshu Rana Student ID: 141344234 Date: 12/10/2024
*
********************************************************************************/



// Import JSON files
const setData = require("../web_322_assignments/data/setData.json");
const themeData = require("../web_322_assignments/data/themeData");

// Initialize an empty array
let sets = [];

// Function to initialize sets array with theme data
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            sets = setData.map(set => {
                const theme = themeData.find(theme => theme.id === set.theme_id);
                return { ...set, theme: theme ? theme.name : 'Unknown' }; // Add theme property
            });
            resolve();
        } catch (error) {
            reject("Error initializing sets: " + error.message);
        }
    });
}

// Function to get all sets
function getAllSets() {
    return new Promise((resolve, reject) => {
        if (sets.length > 0) {
            resolve(sets);
        } else {
            reject("No sets found");
        }
    });
}

// Function to get set by number
function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        const foundSet = sets.find(set => set.set_num === setNum);
        if (foundSet) {
            resolve(foundSet);
        } else {
            reject(`Set with number ${setNum} not found`);
        }
    });
}

// Function to get sets by theme
function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        const matchingSets = sets.filter(set => set.theme.toLowerCase().includes(theme.toLowerCase()));
        if (matchingSets.length > 0) {
            resolve(matchingSets);
        } else {
            reject(`No sets found for theme: ${theme}`);
        }
    });
}

// Export functions
module.exports = {
    initialize,
    getAllSets,
    getSetByNum,
    getSetsByTheme
};
