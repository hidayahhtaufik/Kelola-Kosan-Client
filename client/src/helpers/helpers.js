export const newMonth = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const d = new Date();
  return monthNames[d.getMonth()];
};

export const numberMonth = () => {
  const d = new Date();
  return d.getMonth();
};
