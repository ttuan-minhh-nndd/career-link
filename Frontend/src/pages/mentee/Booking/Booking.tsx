import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import path from "../../../constants/path";
import usersApi from "@/apis/auth.api";

type BookingPayment = {
  orderId: string;
  qrImage: string; // data:image/png;base64,...
  momoPhone: string;
  note: string;
};

type BookingDetailData = {
  id: number;
  menteeId: number;
  mentorId: number;
  availabilityId: number;
  status: "pending" | "paid" | "expired" | string;
  sessionPrice: string;
  expiresAt: string;
  startTime: string;
  endTime: string;
  mentorName: string;
  createdAt: string;
  updatedAt: string;
  payment: BookingPayment;
};

// 👉 MOCK BOOKING (từ JSON bạn gửi)
const MOCK_BOOKING: BookingDetailData = {
  id: 9,
  menteeId: 21,
  mentorId: 7,
  availabilityId: 5,
  status: "pending",
  sessionPrice: "69.00",
  expiresAt: "2025-11-20T08:56:45.149Z",
  startTime: "2025-12-01T15:00:00.000Z",
  endTime: "2025-12-01T16:00:00.000Z",
  mentorName: "Ruby Lieu",
  createdAt: "2025-11-20T08:41:45.142Z",
  updatedAt: "2025-11-20T08:41:45.142Z",
  payment: {
    orderId: "CL_1763628105166",
    qrImage:
      "data:image/png;base64,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",
    momoPhone: "0933419625",
    note: "CareerLink_CL_1763628105166",
  },
};

export default function BookingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const {
    mentorId,
    mentorName,
    slotId,
    startTime: bookedStartTime,
    endTime: bookedEndTime,
  } = location.state as {
    mentorId: number;
    mentorName: string;
    slotId: number;
    startTime: string;
    endTime: string;
  };

  const availabilityId = Number(slotId);

  const { data: bookingDetailsData } = useQuery({
    queryKey: ["bookingDetails", availabilityId],
    queryFn: () => usersApi.booking(availabilityId),
    enabled: !!availabilityId,
  });

  const booking = bookingDetailsData?.data ?? null;

  // Fake fetch booking
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const { startDate, startTime, endTime, expiresAt } = useMemo(() => {
    if (!booking) {
      return {
        startDate: "",
        startTime: "",
        endTime: "",
        expiresAt: "",
      };
    }

    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);
    const exp = new Date(booking.expiresAt);

    return {
      startDate: start.toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      startTime: start.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      endTime: end.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      expiresAt: exp.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }, [booking]);

  if (loading) {
    return (
      <section className="min-h-screen bg-blue-50">
        <div className="mx-auto flex max-w-4xl items-center justify-center px-4 py-16">
          <div className="rounded-xl bg-white px-4 py-3 text-sm text-blue-700 shadow-sm border border-blue-100">
            Đang tải thông tin booking...
          </div>
        </div>
      </section>
    );
  }

  if (!booking) {
    return (
      <section className="min-h-screen bg-blue-50">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="rounded-xl bg-white px-4 py-3 text-sm text-red-700 shadow-sm border border-red-100">
            Không tìm thấy thông tin booking.
          </div>
        </div>
      </section>
    );
  }

  const priceNumber = Number(booking.sessionPrice || "0");

  return (
    <section className="min-h-screen bg-blue-50/40">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 bg-white hover:bg-blue-50"
          >
            <span className="text-base">←</span>
            <span>Quay lại</span>
          </button>

          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-sky-600">
              Booking
            </p>
            <h1 className="text-lg font-semibold text-slate-800">
              Thanh toán phiên mentoring
            </h1>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-5">
          {/* Thông tin booking */}
          <div className="md:col-span-3 rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-500">Mentor</p>
                <h2 className="text-base font-semibold text-slate-800">
                  {booking.mentorName}
                </h2>
              </div>

              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  booking.status === "pending"
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : booking.status === "paid"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                Trạng thái: {booking.status}
              </span>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-sky-600">
                  Thời gian phiên mentoring
                </span>
                <p className="text-sm text-slate-800">
                  {startDate}
                  <br />
                  {startTime} - {endTime}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-sky-600">
                  Giá phiên
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  {priceNumber > 0 ? `$${booking.sessionPrice}` : "Miễn phí"}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-sky-600">
                  Thông tin thanh toán Momo
                </span>
                <p className="text-sm text-slate-700">
                  SĐT Momo:{" "}
                  <span className="font-semibold">
                    {booking.payment.momoPhone}
                  </span>
                  <br />
                  Nội dung chuyển khoản:{" "}
                  <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
                    {booking.payment.note}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-[0.08em] text-sky-600">
                  Mã đơn hàng
                </span>
                <p className="text-xs font-mono text-slate-600">
                  {booking.payment.orderId}
                </p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="md:col-span-2 rounded-2xl bg-white border border-slate-200 p-5 shadow-sm flex flex-col items-center">
            <h3 className="mb-2 text-sm font-semibold text-slate-800">
              Quét QR để thanh toán
            </h3>
            <p className="mb-4 text-xs text-slate-500 text-center">
              Mở ứng dụng Momo, chọn quét mã QR và quét mã bên dưới để thanh
              toán số tiền tương ứng.
            </p>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <img
                src={booking.payment.qrImage}
                alt="QR thanh toán"
                className="h-64 w-64 object-contain"
              />
            </div>

            <button
              onClick={() => navigate(path.home || "/")}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-500"
            >
              Tôi đã thanh toán
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
