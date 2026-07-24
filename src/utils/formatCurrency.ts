const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

/**
 * Formats a number as USD currency, e.g. 27.98 -> "$27.98".
 * A single shared Intl.NumberFormat instance is reused (they are
 * expensive to construct) instead of creating one per render.
 */
export const formatCurrency = (value: number): string =>
  currencyFormatter.format(value)
