// /controllers/convertHandler.js

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    // Split the input into number and unit parts
    let number = input.match(/[.\d\/]+/g) || ["1"];
    let unit = input.match(/[a-zA-Z]+/g)[0];
    // Check for multiple fractions
    if (number[0].includes('/')) {
      let fractionParts = number[0].split('/');
      if (fractionParts.length > 2) {
        return 'invalid number';
      }
      result = parseFloat(fractionParts[0]) / parseFloat(fractionParts[1]);
    } else {
      result = parseFloat(number[0]);
    }
    return isNaN(result) ? 'invalid number' : result;
  };
  
  this.getUnit = function(input) {
    let unit = input.match(/[a-zA-Z]+/g)[0];
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(unit.toLowerCase())) {
      return 'invalid unit';
    }
    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitPairs = {
      'gal': 'L',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitPairs[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return unitNames[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const conversionRates = {
      'gal': 3.78541,
      'l': 1/3.78541,
      'mi': 1.60934,
      'km': 1/1.60934,
      'lbs': 0.453592,
      'kg': 1/0.453592
    };
    let result = initNum * conversionRates[initUnit.toLowerCase()];
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;