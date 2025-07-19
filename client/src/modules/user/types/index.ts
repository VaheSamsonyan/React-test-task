export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  birthDate?: string;
  image?: FileList;
}

export interface UserByIdResponse {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  birthDate?: string;
}
