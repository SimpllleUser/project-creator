  
 import config from '../src/config/config'; 
 import { logger } from '../src/utils/Logger'; 
 import morgan from 'morgan'; 
 import express from 'express'; 
 import authUtils from './utils/AuthUtils'; 
 import userRouter from './routes/UserRoutes'; 
 import authRoutes from './routes/AuthRoutes'; 
 import database from '../src/db/index'; 
  
 const port = config.app.port || 3009; 
 const app = express(); 
  
 app.use(express.json()); 
 app.use(express.urlencoded({ extended: false })); 
 app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); 
  
 app.use('/api/v1/users', userRouter); 
 app.use('/api/v1/authorization', authRoutes); 
 app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/authorization', authRoutes);
database.sequelize.sync();
app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to this node API.'
  })
);

app.listen(port, () => {
  logger.info('Server is running on PORT: ' + config.app.port);
  logger.info('Environment: ' + config.app.environment);
});

export default app; 