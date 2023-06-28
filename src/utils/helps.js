export function generatePinCode() {
  const pinLength = 5;
  let pin = "";
  for (let i = 0; i < pinLength; i++) {
    const digit = Math.floor(Math.random() * 10);
    pin += digit.toString();
  }
  return pin; //random XXXXX
}
