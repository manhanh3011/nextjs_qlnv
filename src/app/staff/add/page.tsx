"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";

function AddStaff() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmployeeForm>(); 

  const onSubmit = async (data: EmployeeForm) => {
    console.log(data);
    const payload = {
      employeeId: data.employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      address: data.address,
      department: data.department,
      role: data.role,
      level: data.level,
      startDate: data.startDate,
      status: "ACTIVE"
    };
    
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log("result", result);

    if (!response.ok) {
      if(result.message === "EMPLOYEE_ID_EXISTS"){
        setError("employeeId", {
          type: "manual",
          message: "Mã nhân viên đã tồn tại",
        });
        return;
      }

      if(result.message === "EMAIL_EXISTS"){
        setError("email", {
          type: "manual",
          message: "Email đã tồn tại",
        });
        return;
      }
      return;
    };

    toast.success("Thêm nhân viên thành công");
    router.push("/staff")
  };

  const fieldClass = (hasError?: boolean) =>
    `w-full h-8 px-2 rounded-md border border-gray-600 outline-none text-xs ${
      hasError
        ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200"
        : "border-gray-600 focus:border-gray-700"
    }`;

  return (
    <div className="bg-olive-100 p-5 min-h-screen">
      <div className="flex gap-4">
        <Link href={"/staff"}>
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <h1 className="font-semibold text-xl">Thêm nhân viên mới</h1>
      </div>

      <form
        className="grid grid-cols-12 gap-4 mt-4 "
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log("FORM ERRORS", errors);
        })}
      >
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
              <label htmlFor="firstName" className="text-sm text-gray-600">
                Họ và tên đệm
              </label>
              <input
                {...register("firstName", {
                  required: "Vui lòng nhập đầy đủ họ và tên đệm",
                })}
                type="text"
                className={fieldClass(!!errors.firstName)}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName?.message}{" "}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="text-sm text-gray-600">
                Tên
              </label>
              <input
                {...register("lastName", {
                  required: "Tên không được để trống",
                })}
                type="text"
                className={fieldClass(!!errors.lastName)}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName?.message} </p>
              )}
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="text-sm text-gray-600">
                Ngày sinh
              </label>
              <input
                {...register("dateOfBirth", {
                  required: "Vui lòng chọn ngày sinh ",
                  validate: (value) => {
                    const today = new Date().toISOString().split("T")[0];
                    if (value > today) {
                      return "Ngày sinh không được lớn hơn ngày hiện tại";
                    }
                    return true;
                  },
                })}
                type="date"
                className={`text-gray-600 text-xs ${fieldClass(!!errors.dateOfBirth)}`}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm">
                  {errors.dateOfBirth?.message}{" "}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="gender" className="text-sm text-gray-600">
                Giới tính
              </label>
              <select {...register("gender", {
                required: "Giới tính là bắt buộc"
              })} 
              className="border border-gray-600 text-gray-600 rounded-md w-full h-8 text-xs px-2 outline-none">
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>

            <div>
              <label htmlFor="starDate" className="text-sm text-gray-600">
                Ngày bắt đầu làm việc
              </label>
              <input
                {...register("startDate", {
                  required: "Vui lòng chọn ngày bắt đầu làm việc",
                  validate: (value) => {
                    const today = new Date().toISOString().split("T")[0];
                    if (value > today) {
                      return "Ngày bắt đầu làm việc không được lớn hơn ngày hiện tại";
                    }
                    return true;
                  },
                })}
                type="date"
                className={`text-gray-600 text-xs ${fieldClass(!!errors.startDate)}`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate?.message}{" "}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="employeeId" className="text-sm text-gray-600">
                Mã nhân viên
              </label>
              <input
                {...register("employeeId", {
                  required: "Mã nhân viên không được để trống",
                })}
                type="text"
                className={fieldClass(!!errors.employeeId)}
              />
              {errors.employeeId && (
                <p className="text-red-500 text-sm">
                  {errors.employeeId?.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="level" className="text-sm text-gray-600">
                Thuộc cấp
              </label>
              <select
                {...register("level", {
                  required: "Vui lòng chọn cấp",
                })}
                className={`text-gray-600 text-xs ${fieldClass(!!errors.level)}`}
              >
                <option value="">Vui lòng chọn</option>
                <option value="INTERN">Intern</option>
                <option value="FRESHER">Fresher</option>
                <option value="JUNIOR">Junior</option>
                <option value="MIDDLE">Middle</option>
                <option value="SENIOR">Senior</option>
                <option value="TECH_LEAD">Tech Lead</option>
              </select>
              {errors.level && (
                <p className="text-red-500 text-sm">{errors.level?.message} </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="text-sm text-gray-600">
                Số điện thoại
              </label>
              <input
                {...register("phone", {
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                    message: "Số điện thoại không đúng định dạng",
                  },
                })}
                type="text"
                className={fieldClass(!!errors.phone)}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone?.message} </p>
              )}
            </div>

            <div className="col-span-2">
              <label htmlFor="address" className="text-sm text-gray-600 ">
                Địa chỉ
              </label>
              <input
                {...register("address", {
                  required: "Vui lòng nhập địa chỉ",
                })}
                type="text"
                className={fieldClass(!!errors.address)}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">
                  {errors.address?.message}{" "}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label htmlFor="departments" className="text-sm text-gray-600">
                Phòng ban
              </label>
              <select
                {...register("department", {
                  required: "Vui lòng chọn phòng ban",
                })}
                className={`text-gray-600 text-xs ${fieldClass(!!errors.department)}`}
              >
                <option value="">Lựa chọn</option>
                <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                <option value="Kế toán">Kế toán</option>
                <option value="Nhân sự">Nhân sự</option>
                <option value="Kinh doanh">Kinh doanh</option>
                <option value="Marketing">Marketing</option>
                <option value="Phát triển sản phẩm">Phát triển sản phẩm</option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm">
                  {errors.department?.message}{" "}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className=" col-span-4 flex flex-col gap-4 ">
          <div className="bg-white rounded-xl h-min p-3">
            <h2 className="font-semibold text-sx">Tài khoản đăng nhập SSO</h2>
            <div className="mt-3">
              <label htmlFor="email" className="text-sm text-gray-600">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Vui lòng nhập đầy đủ email",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Email không đúng định dạng",
                  },
                })}
                type="email"
                className={fieldClass(!!errors.email)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email?.message} </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl h-min p-3">
            <h2 className="font-semibold text-sx">Vai trò khác</h2>
            <div className="mt-3">
              <label htmlFor="role" className="text-sm text-gray-600">
                Vai trò
              </label>
              <select
                {...register("role", {
                  required: "Vui lòng chọn vai trò",
                })}
                className="border border-gray-600 text-gray-600 rounded-md w-full h-8 text-xs px-2 outline-none"
              >
                <option value="">Vui lòng chọn</option>
                <option value="Trưởng phòng">Trưởng phòng</option>
                <option value="Nhân viên">Nhân viên</option>
              </select>
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

        <div className="col-span-8 flex justify-center mt-5">
          <button
            type="submit"
            onClick={() => console.log("submit clicked")}
            className="px-2 py-1 text-sm border border-gray-500 bg-white rounded-md hover:bg-gray-200"
          >
            Thêm mới
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStaff
