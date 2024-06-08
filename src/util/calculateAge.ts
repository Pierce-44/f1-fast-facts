export default function calculateAge(dobString: string) {
  // Parse the date of birth string
  const dob = new Date(dobString);

  // Get the current date
  const today = new Date();

  // Calculate the difference in years
  let age = today.getFullYear() - dob.getFullYear();

  // Adjust if the birthday has not occurred this year
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}
