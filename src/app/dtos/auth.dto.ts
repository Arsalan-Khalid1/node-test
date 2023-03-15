import { IsEmail, Length, IsString, MinLength, MaxLength, Matches, IsNotEmpty } from "class-validator";
import { Match } from "../decorators/match";

export class SignupDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match("password")
  passwordConfirmation: string;

  @Length(1, 255)
  name?: string = "";

  constructor(
    email: string,
    password: string,
    passwordConfirmation: string,
    name?: string,
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.passwordConfirmation = passwordConfirmation
  }
}

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(
    email: string,
    password: string,
  ) {
    this.email = email;
    this.password = password;
  }
}
