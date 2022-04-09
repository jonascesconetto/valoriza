import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest{
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {

  async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest){
    const complimentsReositories = getCustomRepository(ComplimentsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    if(user_sender === user_receiver){
      throw new Error("User receiver must be diferent from sender!")
    } 
    
    const userReceiverExists = await usersRepositories.findOne(user_receiver) // por padrão o método findOne recebe um id, caso necessário mudar o parametro é preciso informa-lo
      
    if(!userReceiverExists){
      throw new Error("User Receiver does not exists!")
    }

    const compliment = complimentsReositories.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    });

    await complimentsReositories.save(compliment)

    return compliment;

  }
}

export {CreateComplimentService}