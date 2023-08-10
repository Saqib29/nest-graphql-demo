import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>){}

    createPet(createPetInput): Promise<Pet> {
        const newPet = this.petRepository.create(createPetInput);

        return this.petRepository.save(newPet);
    }

    async findAll(): Promise<Pet[]>{
        return this.petRepository.find();
    }
}
