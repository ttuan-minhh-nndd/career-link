export default function ConfirmBookingModal({
  open,
  onClose,
  onConfirm
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
        <h2 className="text-base font-semibold text-slate-800 mb-3">
          Xác nhận thanh toán
        </h2>

        <p className="text-sm text-slate-600 mb-4">
          Bạn có chắc muốn tiếp tục đặt lịch và thanh toán cho slot này?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Hủy
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-sky-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
