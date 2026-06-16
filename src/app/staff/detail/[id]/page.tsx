"use client";
import { employees } from "@/src/app/data/staff";
import Link from "next/link";
import { useParams } from "next/navigation";

function AddStaff() {
  const { id } = useParams();

  const staff = employees.find((item) => item.id === Number(id));

  const fieldClass = () =>
    "w-full h-8 px-2 rounded-md border border-gray-300 bg-gray-50 text-xs text-gray-600 outline-none";

  return (
    <div className="bg-olive-100 p-5 min-h-screen">
      <div className="flex gap-4">
        <Link href={"/staff"}>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <h1 className="font-semibold text-xl">Chi tiết nhân viên</h1>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-4 ">
        <div className="bg-white col-span-8 rounded-xl p-3">
          <h2 className="font-semibold text-sx">Hồ sơ nhân viên</h2>
          <div className="flex gap-3 items-center mt-2">
            <img
              className="rounded-full w-20 h-20 "
              src="https://theselfishmeme.co.uk/wp-content/uploads/2025/11/avatar-mac-dinh-nam-doc-dao-1.webp"
              alt="avatar"
            />
            <button
              type="button"
              className="px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm cursor-pointer"
            >
              Tải ảnh lên
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <label htmlFor="fullName" className="text-sm text-gray-600">
                Họ và tên đệm
              </label>
              <input
                value={staff?.fullName ?? ""}
                readOnly
                className={fieldClass()}
              />
            </div>

            <div>
              <label htmlFor="name" className="text-sm text-gray-600">
                Tên
              </label>
              <input
                value={staff?.name ?? ""}
                readOnly
                className={fieldClass()}
              />
            </div>

            <div>
              <label htmlFor="birthday" className="text-sm text-gray-600">
                Ngày sinh
              </label>
              <input
                type="date"
                value={staff?.birthday ?? ""}
                readOnly
                className={fieldClass()}
              />
            </div>

            <div>
              <label htmlFor="sex" className="text-sm text-gray-600">
                Giới tính
              </label>
              <input
                value={staff?.gender ?? ""}
                readOnly
                className={fieldClass()}
              />
            </div>

            <div>
              <label htmlFor="starDate" className="text-sm text-gray-600">
                Ngày bắt đầu làm việc
              </label>
              <input
                type="date"
                value={staff?.startDate ?? ""}
                readOnly
                className={fieldClass()}
              />
            </div>

            <div>
              <label htmlFor="employeeId" className="text-sm text-gray-600">
                Mã nhân viên
              </label>
              <input
                value={staff?.employeeId ?? ""}
                readOnly
                className={fieldClass()}
              />
            </div>

            <div>
              <label htmlFor="level" className="text-sm text-gray-600">
                Thuộc cấp
              </label>
              <input
                value={staff?.level ?? ""}
                readOnly
                className={fieldClass()}
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-sm text-gray-600">
                Số điện thoại
              </label>
              <input
                value={staff?.phone ?? ""}
                readOnly
                className={fieldClass()}
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="address" className="text-sm text-gray-600 ">
                Địa chỉ
              </label>
              <input
                value={staff?.address ?? ""}
                readOnly
                className={fieldClass()}
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="departments" className="text-sm text-gray-600">
                Phòng ban
              </label>
              <input
                value={staff?.departments ?? ""}
                readOnly
                className={fieldClass()}
              />
            </div>
          </div>
        </div>

        <div className=" col-span-4 flex flex-col gap-4 ">
          <div className="bg-white rounded-xl h-min p-3">
            <h2 className="font-semibold text-sx">Trạng thái</h2>
            <div className="mt-3">
              <input
                value={staff?.status ?? ""}
                readOnly
                className={fieldClass()}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl h-min p-3">
            <h2 className="font-semibold text-sx">Tài khoản đăng nhập SSO</h2>
            <div className="mt-3">
              <label htmlFor="email" className="text-sm text-gray-600">
                Email
              </label>
              <input
                value={staff?.email ?? ""}
                readOnly
                className={fieldClass()}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl h-min p-3">
            <h2 className="font-semibold text-sx">Vai trò khác</h2>
            <div className="mt-3">
              <label htmlFor="role" className="text-sm text-gray-600">
                Vai trò
              </label>
              <input
                value={staff?.role ?? ""}
                readOnly
                className={fieldClass()}
              />
            </div>
          </div>
        </div>

        <div className="bg-white col-span-8 rounded-xl p-3">
          <h2 className="font-semibold text-sm">Giấy tờ đính kèm</h2>
          <p className="text-sm mt-2 text-gray-600">Tải bản scam giấy tờ</p>
          <div className="border border-dashed border-gray-400 rounded-md w-full h-40 flex flex-col justify-center items-center">
            <button
              type="button"
              className="px-2 py-1 text-sm border border-gray-400 rounded-md cursor-pointer"
            >
              Tải lên
            </button>
            <p className="text-gray-400 text-sm">PDF, JPG, JPEG, PNG</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStaff