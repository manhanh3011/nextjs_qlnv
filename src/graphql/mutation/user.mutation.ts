export const mutationCreateUser = `
    mutation CreateUser($input: CreateUserInput!){
      createUser(input: $input){
        user{
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

export const mutationUpdateUser = `
  mutation UpdateUser($input: UpdateUserByIdInput!){
    updateUserById(input: $input){
      user{
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

export const mutationDeleteUser = `
  mutation DeleteUser($input: DeleteUserByIdInput!) {
    deleteUserById(input: $input) {
      user{
        id
      }
    }
  }
`;
