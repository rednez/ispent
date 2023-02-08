export function randomColorHex() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export function getFirstDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
