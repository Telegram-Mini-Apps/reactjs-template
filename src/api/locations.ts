import { baseInstance } from "./baseClient"
import { LocationResponseModel, Pagination } from "./interfaces"

export const getAllLocations = ({
  skip = 0,
  limit = 1000
}: Pagination) => {
  return baseInstance.get<LocationResponseModel[]>(`locations/?skip=${skip}&limit=${limit}`)
}

export const getLocationById = (id: number) => {
  return baseInstance.get<LocationResponseModel>(`locations/${id}`)
}
