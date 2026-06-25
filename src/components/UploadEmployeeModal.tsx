"use client";

import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { importUsers } from "../services/user.sevice";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadEmployeeModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadEmployeeTemplate = () => {
    const rows = [
      {
        employeeId: "NV001",
        firstName: "Nguyễn Văn",
        lastName: "An",
        email: "an@example.com",
        phone: "0901234567",
        gender: "MALE",
        dateOfBirth: "1998-01-20",
        address: "Hà Nội",
        department: "IT",
        role: "Developer",
        level: "JUNIOR",
        startDate: "2024-06-01",
        status: "ACTIVE",
      },
      {
        employeeId: "NV002",
        firstName: "Trần Thị",
        lastName: "Bình",
        email: "binh@example.com",
        phone: "0907654321",
        gender: "FEMALE",
        dateOfBirth: "1999-03-15",
        address: "Đà Nẵng",
        department: "HR",
        role: "HR Executive",
        level: "FRESHER",
        startDate: "2024-07-01",
        status: "ACTIVE",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(rows);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    XLSX.writeFile(workbook, "employee-import-template.xlsx");
  };

  const handleImport = async () => {
    if (!file) return;

    try {
      const result = await importUsers(file);

      console.log(result);
      toast.success("Tải lên thành công");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-xl rounded-lg bg-white shadow-lg animate-in ">
        <div className="flex items-center justify-between border-b border-gray-300 bg-olive-100 px-5 py-4 ">
          <h2 className="font-semibold">Tải lên nhân viên</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-400"
          >
            {file ? (
              <>
                <p className="font-medium">{file.name}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </>
            ) : (
              <>
                <p className="font-medium text-sm">
                  Kéo thả hoặc chọn tệp để tải lên
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Hỗ trợ định dạng .xlsx, .xls
                </p>

                <p className="text-sm text-gray-500">Kích thước tối đa 100MB</p>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
        <div
          className="flex items-center justify-between border-t border-gray-300 px-5 py-3">
          <button
            type="button"
            onClick={downloadEmployeeTemplate}
            className="text-sm text-blue-600 hover:underline"
          >
            Tải xuống file mẫu
          </button>
          <div>
            <button
              onClick={onClose}
              className="rounded-md border px-2 py-1 text-sm"
            >
              Đóng
            </button>
            <button onClick={handleImport} className="rounded-md bg-black px-2 py-1 ml-1 text-sm text-white">
              Tải lên
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
