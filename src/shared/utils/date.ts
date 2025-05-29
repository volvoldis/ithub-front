export const formatDT = (sourceDate: string, withTime?: boolean) => {
  let options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: 'numeric',
    year: 'numeric',
  };

  if (withTime) {
    options = {
      ...options,
      hour: '2-digit',
      minute: '2-digit',
    };
  }

  return new Intl.DateTimeFormat('en-GB', options).format(new Date(sourceDate));
};
