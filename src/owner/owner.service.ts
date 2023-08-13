import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from '@nestjs/graphql';

@Injectable()
export class OwnerService {
  constructor(@InjectRepository(Owner) private ownerRepository: Repository<Owner>){}


  create(createOwnerInput: CreateOwnerInput): Promise<Owner> {
    const newOwner = this.ownerRepository.create(createOwnerInput);

    return this.ownerRepository.save(newOwner);
  }

  @Query(returns => [Owner])
  owners(): Promise<Owner[]> {
    return this.ownerRepository.find();
  }

  findOne(id: number) {
    return this.ownerRepository.findOneByOrFail({id});
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
