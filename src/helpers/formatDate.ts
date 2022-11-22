export const formatDate = ({
  stringDate,
}: {
  stringDate: string | undefined;
}) => {
  const date = new Date(stringDate ? `${stringDate}T00:00:00` : Date.now());
  const month = new Intl.DateTimeFormat("es", { month: "long" }).format(date);
  const monthFormat = month.charAt(0).toUpperCase() + month.slice(1);
  return `${monthFormat} ${date.getDate()}, ${date.getFullYear()}`;
};
