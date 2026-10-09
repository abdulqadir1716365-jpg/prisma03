// 1. Inhe interface se class mein badlein taaki Decorator metadata error fix ho jaye
export class CreateUserDto {
  email!: string;
  name?: string;
}

export class UpdateUserDto {
  name?: string;
  email?: string;
}

// Yeh sirf return type hai (bina decorator ke), toh yeh interface reh sakta hai
export interface UserResponse {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
}
