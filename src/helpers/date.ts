export const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

/**
 * @param dateLeft Date
 * @param dateRight Date
 * @author https://github.com/date-fns/date-fns/blob/f71d4b8a4c995e33fc780e17756d1ee237e085ac/src/toDate/index.ts#L33
 */
export function compareDesc(dateLeft: Date, dateRight: Date): number {
  const diff = dateLeft.getTime() - dateRight.getTime();

  if (diff > 0) {
    return -1;
  } else if (diff < 0) {
    return 1;
    // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}
