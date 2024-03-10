export const generateRoomId = () => {
  const randomStringGenerator = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

  return (
    randomStringGenerator() +
    randomStringGenerator() +
    "-" +
    randomStringGenerator() +
    "-" +
    randomStringGenerator() +
    "-" +
    randomStringGenerator() +
    "-" +
    randomStringGenerator() +
    randomStringGenerator() +
    randomStringGenerator()
  );
};

/*
((1 + Math.random()) * 0x10000) | 0: This part multiplies the result by 0x10000 (which is 65536 in decimal) and performs a bitwise OR operation with 0. The bitwise OR operation with 0 effectively rounds down the result to an integer. This ensures that the final result is an integer in the range [0, 65535].

.toString(16): Converts the integer to its hexadecimal representation.

.substring(1): Removes the first character from the hexadecimal string. This is done to exclude the '0' at the beginning of the string, ensuring that the resulting string starts with a non-zero digit. */
