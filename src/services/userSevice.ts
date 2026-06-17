import { mutationCreateUser, mutationDeleteUser, mutationUpdateUser } from "../graphql/mutation/user.mutation";
import { queryGetUserById, queryGetUsers } from "../graphql/query/user.query";
import { callApi } from "./callApiService";

export async function getUsers() {
    return callApi(queryGetUsers)
};

export async function createUser(data: any) {
    return callApi(mutationCreateUser, {
      input: {
        user: data,
      }
    });
}

export async function updateUser(id: number, data: any) {
    return callApi(mutationUpdateUser, {
      input: {
        id,
        userPatch: data,
      }
    });
}

export async function getUserById(id: number) {
  return callApi(queryGetUserById, { id });
}

export async function deleteUser(id: number) {
  return callApi(mutationDeleteUser, { 
    input: {
      id,
    }  
  });
}

