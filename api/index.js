import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';
import listingRouter from './routes/listing.route.js';
import commentRoutes from './routes/comment.route.js';
import applicationRouter from './routes/application.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createRequire } from 'module';

// Use createRequire to allow the usage of require in an ES module context
const require = createRequire(import.meta.url);
const stripe = require('stripe')('sk_test_51QKv0yHJIISUW9IJ7MmzxLZT29UCbPkCyvfyX9GNGrr7XuhnKNVYhKSdKW5Um9V2f5w5OFZWljeWiZfRYh5DYxRn0089uSPbPe');


dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });


const app= express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.post('/payment', async (req, res) => {
  try {
      const product = await stripe.products.create({
          name: "Application Form",
      });

      const price = await stripe.prices.create({
          product: product.id,
          unit_amount: 300 * 100, // 100 INR
          currency: 'NPR',
      });

      const session = await stripe.checkout.sessions.create({
          line_items: [
              {
                  price: price.id,
                  quantity: 1,
              }
          ],
          mode: 'payment',
          success_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/cancel',
          customer_email: req.body.email,
      });

      res.json({ url: session.url });
  } catch (error) {
      console.error('Error creating payment session:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!!');

});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listing', listingRouter);
app.use('/api/comment', commentRoutes);
app.use('/api/application', applicationRouter);

app.use ((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});