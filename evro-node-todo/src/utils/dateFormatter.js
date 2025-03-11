const formatDateTime = (date) => {
  if (!date) return null; // Handle null values

  return new Date(date)
    .toLocaleString("en-US", {
      timeZone: "UTC", // Adjust if needed
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    })
    .replace(",", ""); // Remove comma
};

module.exports = formatDateTime;
