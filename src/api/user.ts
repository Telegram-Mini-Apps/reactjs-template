import { baseInstance } from "./baseClient"
import { CharacterResponseModel, ClothesResponseModel, LocationResponseModel, UserResponseModel } from "./interfaces"

export const getUserById = (id: number) => {
  return baseInstance.get<UserResponseModel>(`user/${id}`)
}

export const getUserLocationsById = (id: number) => {
  return baseInstance.get<LocationResponseModel[]>(`user/${id}/location/`)
}

export const getUserClothesById = (userId: number) => {
  return baseInstance.get<ClothesResponseModel[]>(`user/${userId}/clothes/`)
}

// Выглядит бесполезным
// export const getUserClothesById = ({
//   userId,
//   clothesId
// }: {userId: number, clothesId: number}) => {
//   return fetch(`${API_PATH}/api/user/${userId}/clothes/${clothesId}`, {
//     method: 'GET',
//   })
// }

export const getUserCharactersById = (userId: number) => {
  return baseInstance.get<CharacterResponseModel[]>(`user/${userId}/character/`)
}
