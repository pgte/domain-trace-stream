var defaultOptions = {
  maxQueue: 1000
};

exports =
module.exports =
function Options(options) {
  if (! options) options = {};
  
  Object.keys(defaultOptions).forEach(function(k) {
    if (!options.hasOwnProperty(k)) options[k] = defaultOptions[k];
  });

  if (typeof options.maxQueue != 'number') throw new Error('options.maxQueue must be a number');
  if (options.maxQueue <= 0) throw new Error('options.maxQueue must be a number > 0');

  return options;
};