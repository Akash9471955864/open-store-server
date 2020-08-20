import cors from 'cors';

var corsOptions: any = {
  origin: /company\.com$/,
  optionsSuccessStatus: 200,
};

if (process.env.NODE_ENV !== 'production') {
  corsOptions.origin = '*';
}

export default cors(corsOptions);
