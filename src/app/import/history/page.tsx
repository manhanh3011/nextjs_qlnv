"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function getImportStatus(row: ImportRawRow): ImportStatus {
  if (!row.isScanned) return "PENDING";
  return row.isValid ? "VALID" : "INVALID";
}

function getImportStatusLabel(row: ImportRawRow) {
  const status = getImportStatus(row);

  if (status === "VALID") return "Hợp lệ";
  if (status === "INVALID") return "Không hợp lệ";
  return "Chờ xử lý";
}

function getImportStatusClass(row: ImportRawRow) {
  const status = getImportStatus(row);

  if (status === "VALID") return "bg-green-200 text-green-700";
  if (status === "INVALID") return "bg-red-200 text-red-700";
  return "bg-yellow-200 text-yellow-700";
}

function History() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState<ImportRawRow[]>([]);
  const [summary, setSummary] = useState<ImportSummary>({
    total: 0,
    valid: 0,
    invalid: 0,
    pending: 0,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<ImportStatus>("ALL");
  const [loading, setLoading] = useState(false);

  const itemPerPage = 10;

  useEffect(() => {
    async function fetchImportHistory() {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/import/history?page=${currentPage}&limit=${itemPerPage}&status=${statusFilter}`,
        );
        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message ?? "Failed to get import history");
        }

        setRows(result.data ?? []);
        setSummary(
          result.summary ?? {
            total: 0,
            valid: 0,
            invalid: 0,
            pending: 0,
          },
        );
        setTotalPages(result.pagination?.totalPages || 1);
      } finally {
        setLoading(false);
      }
    }

    fetchImportHistory();
  }, [currentPage, statusFilter]);

  const handleChangeStatusFilter = (status: ImportStatus) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const stats = [
    {
      label: "Tổng bản ghi",
      value: summary.total,
      status: "ALL" as ImportStatus,
    },
    {
      label: "Bản ghi hợp lệ",
      value: summary.valid,
      status: "VALID" as ImportStatus,
    },
    {
      label: "Bản ghi không hợp lệ",
      value: summary.invalid,
      status: "INVALID" as ImportStatus,
    },
    {
      label: "Bản ghi chờ xử lý",
      value: summary.pending,
      status: "PENDING" as ImportStatus,
    },
  ];

  return (
    <div className="min-h-screen bg-olive-100 p-3">
        <div className="flex items-center">
            <button onClick={() => router.push("/staff")}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>
        <h1 className="text-xl font-bold ml-2">Lịch sử tải lên</h1>
        
      </div>

      <div className="my-3 grid grid-cols-4 rounded-lg bg-white shadow-sm">
        {stats.map((item, index) => (
          <div
            key={item.status}
            className={`${index === 0 ? "" : "border-l border-gray-300"} p-2`}
          >
            <button
              onClick={() => handleChangeStatusFilter(item.status)}
              className={`w-full cursor-pointer rounded-lg p-2 text-left hover:bg-gray-200 ${
                statusFilter === item.status ? "bg-gray-200" : ""
              }`}
            >
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-sm font-bold">{item.value}</p>
            </button>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-300 px-5 py-2">
          <p className="text-xs text-gray-500">
            {loading ? "Đang tải..." : `${rows.length} bản ghi`}
          </p>
        </div>

        <table className="w-full">
          <thead className="text-xs">
            <tr className="border-b border-gray-300 bg-gray-50">
              <th className="px-4 py-2 text-left font-semibold">STT</th>
              <th className="px-4 py-2 text-left font-semibold">Họ tên</th>
              <th className="px-4 py-2 text-left font-semibold">
                Mã nhân viên
              </th>
              <th className="px-4 py-2 text-left font-semibold">Email</th>
              <th className="px-4 py-2 text-left font-semibold">Phòng ban</th>
              <th className="px-4 py-2 text-left font-semibold">Chức vụ</th>
              <th className="px-4 py-2 text-left font-semibold">
                Trạng thái import
              </th>
              <th className="px-4 py-2 text-left font-semibold">Lỗi</th>
              <th className="px-4 py-2 text-left font-semibold">Xử lý lúc</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {rows.map((row, index) => (
              <tr
                className="border-b border-gray-300 hover:bg-gray-50"
                key={row.id}
              >
                <td className="px-4 py-2">
                  {(currentPage - 1) * itemPerPage + index + 1}
                </td>
                <td className="px-4 py-2">
                  {`${row.firstName ?? ""} ${row.lastName ?? ""}`.trim() ||
                    "-"}
                </td>
                <td className="px-4 py-2">{row.employeeId || "-"}</td>
                <td className="px-4 py-2">{row.email || "-"}</td>
                <td className="px-4 py-2">{row.department || "-"}</td>
                <td className="px-4 py-2">{row.role || "-"}</td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded-full px-2 py-1 ${getImportStatusClass(
                      row,
                    )}`}
                  >
                    {getImportStatusLabel(row)}
                  </span>
                </td>
                <td className="max-w-52 px-4 py-2 text-red-600">
                  <span className="line-clamp-2">{row.errorMessage || "-"}</span>
                </td>
                <td className="px-4 py-2">
                  {row.processedAt
                    ? new Date(row.processedAt).toLocaleString("vi-VN")
                    : "-"}
                </td>
              </tr>
            ))}

            {!loading && rows.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={9}>
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-end border-t border-gray-200 px-5 py-1 text-xs">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="mr-1 rounded-md border border-gray-300 px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Trước
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`mr-1 rounded-md border border-gray-300 px-2 py-1 hover:bg-gray-100 ${
                  currentPage === page ? "bg-black text-white" : ""
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="rounded-md border border-gray-300 px-2 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}

export default History;
