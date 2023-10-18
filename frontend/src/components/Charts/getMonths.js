export default function getLastYearMonths() {
  const labels = [];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const currMonth = new Date().getMonth();
  for (let i = currMonth; i > 0; i -= 1) {
    const elem = months[i];
    labels.unshift(elem);
  }
  for (let i = 11; i > currMonth; i -= 1) {
    const elem = months[i];
    labels.unshift(elem);
  }
  return labels;
}
