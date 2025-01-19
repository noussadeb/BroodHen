

export const calculateDayNumber = (startDate) => {
    if (!startDate) return 0;
    const today = new Date();
    const start = new Date(startDate);
    return Math.max(0, Math.floor((today - start) / (1000 * 3600 * 24)) + 1);
  };
  
  export const getTemperatureAndHumidity = (dayNumber) => {
    if (dayNumber <= 18) return { temperature: '37.5°C', humidity: '65%' };
    if (dayNumber <= 21) return { temperature: '38.5°C', humidity: '75%' };
    return { temperature: 'N/A', humidity: 'N/A' };
  };
  