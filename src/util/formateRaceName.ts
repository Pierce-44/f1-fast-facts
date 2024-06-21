export function formatString(str: string) {
  // Replace underscores with spaces
  let formattedStr = str.replace(/_/g, " ");

  // Capitalize the first letter of each word
  formattedStr = formattedStr
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the array back into a single string

  return formattedStr;
}
