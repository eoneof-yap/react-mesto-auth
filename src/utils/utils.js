export function requestErrorHandler(err) {
  console.warn(
    `Произошла трагическая, непоправимая ошибка: ${err.message} | ${err.stack}`,
  );
}
