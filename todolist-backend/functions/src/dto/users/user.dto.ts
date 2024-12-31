import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty({ message: "El campo name es requerido" })
  @IsString({ message: "El nombre debe ser un string" })
  username!: string;

  @IsNotEmpty({ message: "El campo email es requerido" })
  @IsEmail({},{ message: "El correo electrónico debe tener un formato válido" })
  email!: string;
}
