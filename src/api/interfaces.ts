export interface Pagination {
  skip?: number,
  limit?: number,
}

export interface CharacterResponseModel {
  id: number,
  name: string,
  happiness_percent: number,
}

export interface LocationResponseModel {
  id: number,
  name: string,
  price: number,
  file_name: string,
  type_id: number
}

export interface ClothesResponseModel {
  id: number,
  name: string,
  price: number,
  file_name: string,
  clothes_type_id?: number,
}

export interface UserResponseModel {
  id: number,
  login: string,
  age: number,
  balance: number
}
