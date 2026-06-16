const HASURA_URL = "http://localhost:8080/v1/graphql";
const HASURA_SECRET = "admin123";

export async function callApi(query: string, variables?: Record<string, any>) {
  console.log({
    query,
    variables,
  });

  const response = await fetch(HASURA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": HASURA_SECRET,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    const message = result.errors[0].message;

    if (message.includes("users_employeeId_key")) {
      throw new Error("EMPLOYEE_ID_EXISTS");
    }
    if (message.includes("users_email_key")) {
      throw new Error("EMAIL_EXISTS");
    }
    
    throw new Error(message);
  }

  return result.data;
}
