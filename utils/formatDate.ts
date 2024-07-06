type FormattedDate = {
  date: string;
  day: string;
};

export const formatDate = (
  dateInput: Date | string,
  dayType: "short" | "long" = "long"
): FormattedDate => {
  // If dateInput is not a Date object, create a Date object from it
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const dayOptions: Intl.DateTimeFormatOptions = { weekday: dayType };
  const day = date.toLocaleDateString("en-US", dayOptions);

  return {
    date: formattedDate,
    day: day,
  };
};

// Example usage:
// const formatted = formatDate(new Date());
// console.log(formatted);
// Output example:
// { date: 'July 6, 2024', day: 'Saturday' }
