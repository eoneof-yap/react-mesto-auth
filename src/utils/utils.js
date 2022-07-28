export function requestErrorHandler(err) {
  console.warn(`Произошла трагическая, непоправимая ошибка: ${err.stack}`);
}
