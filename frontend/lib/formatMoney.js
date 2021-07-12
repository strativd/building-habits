export default function formatMoney(price) {
  const dollars = price / 100;
  // return `$${dollars}`;

  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };

  // Check for full dollar amount
  if (dollars % 1 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat('en-US', options);

  return formatter.format(dollars);
}
