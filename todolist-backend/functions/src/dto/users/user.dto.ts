import {IsString, IsEmail, IsNotEmpty} from "class-validator";

/**
 * DTO para representar un usuario.
 */
export class UserDTO {
  /**
   * El nombre de usuario.
   * @type {string}
   */
  @IsNotEmpty({message: "El campo name es requerido"})
  @IsString({message: "El nombre debe ser un string"})
    username!: string;

  /**
   * El correo electrónico del usuario.
   * @type {string}
   */
  @IsNotEmpty({message: "El campo email es requerido"})
  @IsEmail({}, {message: "El correo electrónico debe tener un formato válido"})
    email!: string;
}
