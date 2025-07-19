export interface CreateUserDto {
  firstName: string;
  lastName: string;
  password: string;
  birthdate?: string;
  image?: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  birthdate?: string;
  password?: string;
  image?: string;
}
