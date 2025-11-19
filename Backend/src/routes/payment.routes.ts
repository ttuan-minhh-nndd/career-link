// ============================================
// FILE: src/routes/payment.routes.ts
// ============================================
import { Router } from 'express';
import { generateMomoQR } from '../controllers/payment.controller';
import { protect } from '../middleware/auth.middleware';

const paymentRoutes = Router();

// @route   POST /api/v1/payment/momo-qr
// @desc    Generate MoMo QR code for payment (optional standalone endpoint)
// @access  Private
paymentRoutes.post('/momo-qr', protect, generateMomoQR);

export default paymentRoutes;
