const defaultSeparator = ",";

function converter({
  csvLine,
  separator = defaultSeparator,
  isTemplateReady = false,
  templateKeys = [],
}) {
  const set = {};
  const arrayValues = csvLine.split(separator);

  if (isTemplateReady) {
    templateKeys.forEach((key, idx) => {
      set[key] = arrayValues[idx].trim();
    });
  } else {
    templateKeys = arrayValues.map((el) => el.trim());
    isTemplateReady = true;
  }

  return { set, isTemplateReady, templateKeys };
}

module.exports = converter;
