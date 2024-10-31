import { baseInstance } from "./baseClient"
import { ClothesResponseModel, Pagination } from "./interfaces"

export const getAllClothes = ({
  skip = 0,
  limit = 1000
}: Pagination) => {
  return baseInstance.get<ClothesResponseModel[]>(`clothes/?skip=${skip}&limit=${limit}`)
}

export const getClothesById = (id: number) => {
  return baseInstance.get<ClothesResponseModel>(`clothes/${id}`)
}
