'use strict';

export default (req,res,next) => {
  let error = { error:'Resource Not Found' };
  res.statusCode = 400;
  res.statusMessage = 'bad request';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};
