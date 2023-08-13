import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnerService } from 'src/owner/owner.service';
import { Owner } from 'src/owner/entities/owner.entity';

@Injectable()
export class PetsService {
    constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>, private ownerService: OwnerService){}

    createPet(createPetInput: CreatePetInput): Promise<Pet> {
        const newPet = this.petRepository.create(createPetInput);

        return this.petRepository.save(newPet);
    }

    async findAll(): Promise<Pet[]>{
        return this.petRepository.find();
    }

    findOne(id: number): Promise<Pet> {
        return this.petRepository.findOneByOrFail({ id })
    }

    getOwner(ownerId: number): Promise<Owner> {
        return this.ownerService.findOne(ownerId)
    }
}
