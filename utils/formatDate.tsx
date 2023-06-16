export function formatDate(date: Date) {
  const originalDate = new Date(date);
  const formattedDate = originalDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDate;
}
