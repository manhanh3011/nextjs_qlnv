"use client";

import Pagination from "@/src/components/Pagination";
import UploadEmployeeModal from "@/src/components/UploadEmployeeModal";
import { GENDER_LABLE, STATUS_LABEL } from "@/src/constants/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function List() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "ACTIVE" | "INACTIVE"
  >("ALL");
  const [openMoal, setOpenModal] = useState(false);

  const itemPerPage = 10;

  const filterUsers =
    statusFilter === "ALL"
      ? users
      : users.filter((user) => user.status == statusFilter);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(
        `/api/users?page=${currentPage}&limit=${itemPerPage}`,
      );
      const result = await res.json();
      console.log("data", result);

      setUsers(result.data);
      setTotalPages(result.pagination.totalPages);
      setTotal(result.pagination.total);
    }
    fetchUsers();
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Bạn có chắc muốn xóa nhân viên này không?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success("Xóa thành công");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  return (
    <div className="min-h-screen p-3 bg-olive-100 ">
      <div className="flex justify-between items-center ">
        <h1 className="text-xl font-bold">Danh sách nhân viên</h1>
        <div className="flex">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-olive-300 hover:bg-olive-400 rounded-md p-1 text-xs"
          >
            Tải lên
          </button>

          <UploadEmployeeModal
            isOpen={openMoal}
            onClose={() => setOpenModal(false)}
          />

          <button
            onClick={() => router.push("/staff/add")}
            className="bg-black hover:bg-gray-500 text-white rounded-md p-1 text-xs ml-1"
          >
            Thêm mới
          </button>

          <button
            onClick={() => router.push("/import/history")}
            className="bg-black hover:bg-gray-500 text-white rounded-md p-1 text-xs ml-1"
          >
            Lịch sử tải lên
          </button>
        </div>
      </div>

      <div className="mt-5 bg-white text-sm rounded-md w-fit px-2 flex items-center gap-2 shadow-sm">
        <label className="">Phòng ban:</label>
        <select className=" bg-transparent outline-none">
          <option value="">Tất cả</option>
          <option value="IT">IT</option>
          <option value="Kế toán">Kế toán</option>
          <option value="Nhân sự">Nhân sự</option>
          <option value="Phát triển sản phẩm">Phát triển sản phẩm</option>
        </select>
      </div>

      <div className="bg-white my-3 grid grid-cols-3 rounded-lg shadow-sm">
        <div className="p-2">
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`w-full rounded-lg p-2 text-left cursor-pointer hover:bg-gray-200 
                      ${statusFilter === "ALL" ? "bg-gray-200" : "hover:bg-gray-200"}`}
          >
            <p className="text-sm text-gray-500">Tất cả</p>
            <p className="text-sm font-bold">{users.length} </p>
          </button>
        </div>

        <div className="border-l border-gray-300 p-2">
          <button
            onClick={() => setStatusFilter("ACTIVE")}
            className={`w-full rounded-lg p-2 text-left cursor-pointer hover:bg-gray-200
                      ${statusFilter === "ACTIVE" ? "bg-gray-200" : "hover:bg-gray-200"}`}
          >
            <p className="text-sm text-gray-500">Đang làm việc</p>
            <p className="text-sm font-bold">
              {users.filter((user) => user.status === "ACTIVE").length}
            </p>
          </button>
        </div>

        <div className="border-l border-gray-300 p-2">
          <button
            onClick={() => setStatusFilter("INACTIVE")}
            className={`w-full rounded-lg p-2 text-left cursor-pointer hover:bg-gray-200
                      ${statusFilter === "INACTIVE" ? "bg-gray-200" : "hover:bg-gray-200"}`}
          >
            <p className="text-sm text-gray-500">Đã nghỉ việc</p>
            <p className="text-sm font-bold">
              {users.filter((user) => user.status === "INACTIVE").length}
            </p>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="flex justify-between items-center border-b border-gray-300">
          <div className="flex text-sm py-1">
            <button className="ml-5 px-3 py-1 text-xs bg-gray-200 rounded-md">
              Mới nhất
            </button>
            <button className="ml-3 px-3 py-1 text-xs hover:bg-gray-100 rounded-md">
              Cũ nhất
            </button>
          </div>
          <div className="border border-gray-300 rounded-md mr-3">
            <input className="text-sm w-1" type="text" />
            <i className="fa-brands fa-sistrix "></i>
          </div>
        </div>

        <table className="w-full">
          <thead className="text-xs">
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="px-4 py-2 text-left font-semibold">STT</th>
              <th className="px-4 py-2 text-left font-semibold">Họ tên</th>
              <th className="px-4 py-2 text-left font-semibold">
                Mã nhân viên
              </th>
              <th className="px-4 py-2 text-left font-semibold">Email</th>
              <th className="px-4 py-2 text-left font-semibold">
                Số điện thoại
              </th>
              <th className="px-4 py-2 text-left font-semibold">Giới tính</th>
              <th className="px-4 py-2 text-left font-semibold">Phòng ban</th>
              <th className="px-4 py-2 text-left font-semibold">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {filterUsers.map((el) => (
              <tr
                className="border-b border-gray-300 cursor-pointer hover:bg-gray-50"
                key={el.id}
                onClick={() => router.push(`/staff/edit/${el.id}`)}
              >
                <td
                  className="px-4 py-2 cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/staff/detail/${el.id}`);
                  }}
                >
                  {el.id}
                </td>
                <td className="px-4 py-2">
                  {`${el.firstName} ${el.lastName}`}{" "}
                </td>
                <td className="px-4 py-2">{el.employeeId} </td>
                <td className="px-4 py-2">{el.email} </td>
                <td className="px-4 py-2">{el.phone} </td>
                <td className="px-4 py-2">{GENDER_LABLE[el.gender]}</td>
                <td className="px-4 py-2">{el.department} </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full ${el.status === "ACTIVE" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}
                  >
                    <i
                      className={`fa-solid mr-1 ${el.status === "ACTIVE" ? "fa-circle-check text-green-500" : "fa-circle-xmark text-red-500"}`}
                    ></i>
                    {STATUS_LABEL[el.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-200 px-5 py-3">
          <div className="flex items-center gap-2 text-sm">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="rounded border px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>bản ghi/trang</span>
          </div>

          <span className="text-sm text-gray-500">
            Hiển thị {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, totalRecords)}
            trên {totalRecords} bản ghi
          </span>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
        {/* <div className="flex items-center justify-end border-t border-gray-200 px-5 py-1 text-xs">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="rounded-md border border-gray-300 px-2 py-1 mr-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-md border border-gray-300 px-2 py-1 mr-1 hover:bg-gray-100 ${
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
            className="rounded-md border border-gray-300 px-2 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default List;
