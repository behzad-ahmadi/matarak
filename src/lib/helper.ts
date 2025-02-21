export const applyMask = (value: string, mask: string): string => {
  let maskedValue = ""; // Initialize the masked value
  let valueIndex = 0; // Index for the input value

  // Iterate through the mask to build the masked value
  for (let i = 0; i < mask.length; i++) {
    if (valueIndex >= value.length) break; // Stop if all input characters are masked

    if (mask[i] === "X") {
      maskedValue += value[valueIndex]; // Add character from the value
      valueIndex++;
    } else {
      maskedValue += mask[i]; // Add mask character (e.g., separators)
    }
  }

  return maskedValue;
};
