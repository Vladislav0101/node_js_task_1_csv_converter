function handleLineArgumentErrors(arguments, necessaryArguments) {
  necessaryArguments.forEach((arg) => {
    if (!(arg in arguments)) {
      throw new Error(`Please enter ${arg} argument`);
    }
  });
}
module.exports = handleLineArgumentErrors;
