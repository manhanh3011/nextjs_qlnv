export const queryGetUsers = `
  query GetUsers {
    allUsers{
      nodes{
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
  }
`;

export const queryGetUserById = `
  query GetUserById($id: Int!) {
    userById(id: $id) {
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