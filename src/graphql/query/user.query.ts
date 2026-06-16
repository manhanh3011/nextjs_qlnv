export const queryGetUsers = `
    query GetUsers{
        users {
            id
            employeeId
            firstName
            lastName
            email
            phone
            department
            gender
            status
        }
    }
`;

export const queryGetUserById = `
  query GetUserById($id: Int!) {
    users_by_pk(id: $id) {
      id
      employeeId
      firstName
      lastName
      email
      phone
      gender
      dateOfBirth
      address
      department
      role
      level
      startDate
      status
    }
  }
`;