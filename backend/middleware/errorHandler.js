const notFound=(request, response)=> {
  response.status(404).json({ message: 'Route not found' });
};
const errorHandler=(error, request, response, next)=> {
  console.error(error);
  response.status(500).json({ message: 'Something went wrong on the server' });
};
module.exports={ notFound, errorHandler };
