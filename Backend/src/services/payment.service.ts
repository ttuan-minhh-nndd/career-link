// ============================================
// FILE: src/services/payment.service.ts
// ============================================
import QRCode from 'qrcode';
import { db } from '../config/db';
import { transactions } from '../models/schema';

export interface GenerateMomoQRRequest {
  bookingId: number;
  amount: string;
}

export interface MomoQRResponse {
  orderId: string;
  amount: string;
  momoPhone: string;
  note: string;
  qrImage: string; // base64 encoded QR code
}

/**
 * Generate a unique order ID
 */
export const generateOrderId = (): string => {
  return `CL_${Date.now()}`;
};

/**
 * Create a transaction record for a booking
 */
export const createTransaction = async (
  bookingId: number,
  amount: string,
  orderId: string
): Promise<void> => {
  await db.insert(transactions).values({
    bookingId,
    momoRequestId: orderId,
    amount,
    status: 'pending',
  });
};

/**
 * Generate MoMo QR code for payment
 */
export const generateMomoQR = async (
  request: GenerateMomoQRRequest
): Promise<MomoQRResponse> => {
  const { bookingId, amount } = request;

  // Generate unique order ID
  const orderId = generateOrderId();

  // Get MoMo wallet from environment
  const momoPhone = process.env.MOMO_WALLET;
  if (!momoPhone) {
    throw new Error('MOMO_WALLET_NOT_CONFIGURED');
  }

  // Create note for the transfer
  const note = `CareerLink_${orderId}`;

  // Build MoMo transfer URI (deep link)
  const momoUri = `momo://transfer?receiver=${momoPhone}&amount=${amount}&comment=${encodeURIComponent(note)}`;

  // Generate QR code image (base64)
  const qrImage = await QRCode.toDataURL(momoUri);

  return {
    orderId,
    amount,
    momoPhone,
    note,
    qrImage,
  };
};
