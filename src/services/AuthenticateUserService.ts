import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
  email: string,
  password: string
 }


class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest){
    
    const usersRepositories = getCustomRepository(UsersRepositories);

    // verificar se e-mail existe

    const user = await usersRepositories.findOne({
      email
    })

    if(!user){
      throw new Error("Email/Password incorrect!") // Boa prática em uso de exceção.
    }
    
    // verifica se a senha está correta
    const passwordMatch = await compare(password, user.password)
    
    if(!passwordMatch){
      throw new Error("Email/Password incorrect!") // Boa prática em uso de exceção.
    }
    
    // Gerar o token
    // sign() 1. Payload, 2. secret key (md5 generator)
    const token = sign(
      {
        email: user.email
      }, 
      "7161D2EB04CAC5BDA7E11353C224847B", 
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return token;
  }
}

export { AuthenticateUserService } 