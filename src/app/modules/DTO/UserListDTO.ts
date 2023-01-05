
export interface UserListDTO {
    totalCount: number;
    results: UserListResponseDTO[];
}

export interface UserListResponseDTO {
    id: number;
    name: string;
    surname: string;
    profilePicture: string;
    telephoneNumber: string;
    email: string;
    address: string;
}
  