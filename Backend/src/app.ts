import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import tagRoutes from './routes/tag.routes';
import availabilityRoutes from './routes/availability.routes';
import mentorRoutes from './routes/mentor.routes';

// We will add other routes here later
// import userRoutes from './routes/user.routes';
// import mentorRoutes from './routes/mentor.routes';
// import bookingRoutes from './routes/booking.routes';

// Initialize express app
const app = express();

// --- Middlewares ---

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Enable express to parse JSON bodies
app.use(express.json());

// --- API Routes ---

// --- NEW WELCOME ROUTE ---
app.get('/', (req: Request, res: Response) => {
  res.status(200).send(`
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CareerLink API</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            background-color: #f4f7f6; 
            margin: 0;
          }
          .container { 
            text-align: center; 
            padding: 2rem; 
            background: #fff; 
            border-radius: 10px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
          }
          h1 { 
            color: #1a202c; 
            font-weight: 700;
          }
          p { 
            color: #4a5568; 
            font-size: 1.1rem;
          }
          a {
            color: #4299e1;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            text-decoration: underline;
          }
          .status {
            color: #2f855a;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to the CareerLink API!</h1>
          <p>Your backend server is running correctly.</p>
          <p>API Health Status: <span class="status">UP</span></p>
          <p>Check out the <a href="/api/v1/health">/api/v1/health</a> route for a JSON status.</p>
        </div>
      </body>
    </html>
  `);
});

// Health check route
app.get('/api/v1/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Authentication routes
app.use('/api/v1/auth', authRoutes);

// Other routes will be added here...
// app.use('/api/v1/users', userRoutes);
// app.seed('/api/v1/mentors', mentorRoutes);
// app.use('/api/v1/bookings', bookingRoutes);


// Other routes will be added here...
app.use('/api/v1/users', userRoutes); // --- NEW ---
app.use('/api/v1/tags', tagRoutes); // --- NEW ---
app.use('/api/v1/availabilities', availabilityRoutes); // --- NEW ---
app.use('/api/v1/mentors', mentorRoutes); // --- NEW ---
// app.use('/api/v1/bookings', bookingRoutes);

// Export the configured app
export default app;