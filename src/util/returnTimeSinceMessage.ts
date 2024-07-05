export default function returnTimeSinceMessage(timestamp: number) {
  // Convert the given timestamp to milliseconds
  const timestampInMs = timestamp * 1000;

  // Create a Date object using the timestamp in milliseconds
  const date = new Date(timestampInMs);

  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract and format the day, month, year, and time
  const day = String(date.getDate()).padStart(2, "0");
  const month = monthNames[date.getMonth()]; // Get month name from array
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Combine date and time into the desired format
  const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes}`;

  return formattedDate;
}
