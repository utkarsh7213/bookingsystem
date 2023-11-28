async function generateRandom4DigitNumber() {
    const randomNumber = Math.floor(Math.random() * 10000);
    const fourDigitNumber = randomNumber.toString().padStart(5, '0');
  
    return fourDigitNumber;
  }
  
// generateRandom4DigitNumber();

  module.exports = generateRandom4DigitNumber;