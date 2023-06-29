const defaultSeparators = [",", "|", ";"];

function getSeparatorFromCsv(string) {
  let separator = defaultSeparators[0];

  defaultSeparators.forEach((separatorTest) => {
    if (string.includes(separatorTest)) separator = separatorTest;
  });

  return separator;
}

module.exports = getSeparatorFromCsv;
