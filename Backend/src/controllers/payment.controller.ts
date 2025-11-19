// ============================================
// FILE: src/controllers/payment.controller.ts
// ============================================
import { Request, Response } from 'express';
import * as paymentService from '../services/payment.service';

/**
 * @desc    Generate MoMo QR code for payment (standalone endpoint if needed)
 * @route   POST /api/v1/payment/momo-qr
 * @access  Private
 * @note    This endpoint is optional since QR is generated during booking creation
 */
export const generateMomoQR = async (req: Request, res: Response) => {
  try {
    const { bookingId, amount } = req.body;

    // Validate input
    if (!bookingId || !amount) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [
          { field: 'bookingId', message: 'bookingId is required' },
          { field: 'amount', message: 'amount is required' },
        ],
      });
    }

    // Generate QR code
    const qrData = await paymentService.generateMomoQR({
      bookingId,
      amount,
    });

    res.status(200).json(qrData);
  } catch (error: any) {
    if (error.message === 'MOMO_WALLET_NOT_CONFIGURED') {
      return res.status(500).json({
        message: 'MoMo wallet not configured on server',
      });
    }
    console.error('Generate MoMo QR error:', error);
    res.status(500).json({ message: 'Failed to generate MoMo QR' });
  }
};
