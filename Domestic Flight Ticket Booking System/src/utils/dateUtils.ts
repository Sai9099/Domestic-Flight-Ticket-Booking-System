export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });
};

export const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDate(tomorrow);
};

export const getNextWeekDate = (): string => {
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  return formatDate(nextWeek);
};