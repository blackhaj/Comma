// Takes in array of objects and two property names. Returns 
const makeSeries = (data, propOne, propTwo) => {
  const propOneSeries = [];
  const propTwoSeries = [];
  for (let i = 0; i < data.length; i++) {
    propOneSeries.push(data[i][propOne]);
    propTwoSeries.push(data[i][propTwo]);
  }
  return {
    [propOne]: propOneSeries,
    [propTwo]: propTwoSeries,
  };
};

module.exports.makeSeries = makeSeries