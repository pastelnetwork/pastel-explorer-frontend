const variant = {
  name: 'original',
  label: 'Original',
  zeroTupleChar: 'z',
};

const removeWhiteSpaces = (content: string) => {
  return content.replace(/\s+/g, '');
};

export const decode = (content: string) => {
  try {
    const string = removeWhiteSpaces(content);
    const n = string.length;

    // Decode each tuple of 5 characters
    const bytes = [];
    let i = 0;
    let digits: number[];
    let tuple: number;
    let tupleBytes: number[];
    while (i < n) {
      if (string[i] === variant.zeroTupleChar) {
        // A single character encodes an all-zero tuple
        bytes.push(0, 0, 0, 0);
        i += 1;
      } else {
        // Retrieve radix-85 digits of tuple
        digits = string
          .substr(i, 5)
          .split('')
          .map((character, index) => {
            const digit = character.charCodeAt(0) - 33;
            if (digit < 0 || digit > 84) {
              throw new Error(`Invalid character '${character}' at index ${index}`);
            }
            return digit;
          });

        // Create 32-bit binary number from digits and handle padding
        // tuple = a * 85^4 + b * 85^3 + c * 85^2 + d * 85 + e
        tuple =
          digits[0] * 52200625 +
          digits[1] * 614125 +
          (i + 2 < n ? digits[2] : 84) * 7225 +
          (i + 3 < n ? digits[3] : 84) * 85 +
          (i + 4 < n ? digits[4] : 84);

        // Get bytes from tuple
        // eslint-disable-next-line
        tupleBytes = [(tuple >> 24) & 0xff, (tuple >> 16) & 0xff, (tuple >> 8) & 0xff, tuple & 0xff];
        // Remove bytes of padding
        if (n < i + 5) {
          tupleBytes.splice(n - (i + 5), 5);
        }

        // Append bytes to result
        // eslint-disable-next-line
        bytes.push.apply(bytes, tupleBytes);
        i += 5;
      }
    }
    const result = new TextDecoder().decode(new Uint8Array(bytes));
    if (result) {
      return JSON.parse(result);
    }
    return null;
  } catch {
    return null;
  }
};
