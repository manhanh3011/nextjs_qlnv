export const mutationCreateUser = `
    mutation CreateUser(
      $employeeId: String!
      $firstName: String!
      $lastName: String!
      $email: String!
      $phone: String!
      $gender: enum_users_gender!
      $dateOfBirth: date!
      $address: String!
      $department: String!
      $role: String!
      $level: enum_users_level!
      $startDate: date!
      $status: enum_users_status!
    ) {
      insert_users_one(
        object: {
          employeeId: $employeeId
          firstName: $firstName
          lastName: $lastName
          email: $email
          phone: $phone
          gender: $gender
          dateOfBirth: $dateOfBirth
          address: $address
          department: $department
          role: $role
          level: $level
          startDate: $startDate
          status: $status
        }
      ) {
        id
        firstName
        lastName
      }
    }
  `;

export const mutationUpdateUser = `
mutation UpdateUser(
  $id: Int!

  $employeeId: String!
  $firstName: String!
  $lastName: String!
  $email: String!
  $phone: String!
  $gender: enum_users_gender!
  $dateOfBirth: date!
  $address: String!
  $department: String!
  $role: String!
  $level: enum_users_level!
  $startDate: date!
  $status: enum_users_status!
) {
  update_users_by_pk(
    pk_columns: { id: $id }
    _set: {
      employeeId: $employeeId
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      gender: $gender
      dateOfBirth: $dateOfBirth
      address: $address
      department: $department
      role: $role
      level: $level
      startDate: $startDate
      status: $status
    }
  ) {
    id
    firstName
    lastName
  }
}
`;

export const mutationDeleteUser = `
  mutation DeleteUser($id: Int!) {
    delete_users_by_pk(id: $id) {
      id
    }
  }
`;
