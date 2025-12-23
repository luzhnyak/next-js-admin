export interface UserDTO {
  id: number;
  displayName: string;
  email: string;
  role: "user" | "admin";
  avatarUrl?: string | undefined;
}
