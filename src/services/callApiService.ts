const GRAPHQL_URL = "http://localhost:5000/graphql";

export async function callApi(query: string, variables?: Record<string, any>) {
  console.log({
    query,
    variables,
  });

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
