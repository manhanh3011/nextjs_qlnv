export async function importUsers(
  file: File
) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/import`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Tải lên thất bại");
  }

  return response.json();
}