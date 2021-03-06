import {Request, Response} from "express"
import { CreateTagService } from "../services/CreateTagService";

class CreateTagCrontroller{

  async handle(request: Request, response: Response){
    const {name} = request.body; // desestruturação

    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name)
  
    return response.json(tag);
  }

}

export { CreateTagCrontroller }