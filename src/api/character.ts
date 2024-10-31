import { baseInstance } from "./baseClient"
import { CharacterResponseModel, ClothesResponseModel } from "./interfaces"

export const getCharacterById = ({
  userId,
  characterId
}: { userId: number, characterId: number }) => {
  return baseInstance.get<CharacterResponseModel>(`user/${userId}/character/${characterId}`)
}

export const getAllCharacterClothes = ({
  userId,
  characterId
}: { userId: number, characterId: number }) => {
  return baseInstance.get<ClothesResponseModel[]>(`user/${userId}/character/${characterId}/clothes`)
}

export const getCharacterClothesById = ({
  userId,
  characterId,
  clothesId
}: { userId: number, characterId: number, clothesId: number }) => {
  return baseInstance.get<ClothesResponseModel>(`user/${userId}/character/${characterId}/clothes/${clothesId}`)
}
