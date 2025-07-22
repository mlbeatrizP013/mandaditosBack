import { Injectable } from '@nestjs/common';
import { CreateEstatusDto } from './dto/create-estatus.dto';
import { UpdateEstatusDto } from './dto/update-estatus.dto';

@Injectable()
export class EstatusService {
  create(createEstatusDto: CreateEstatusDto) {
    return 'This action adds a new estatus';
  }

  findAll() {
    return `This action returns all estatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estatus`;
  }

  update(id: number, updateEstatusDto: UpdateEstatusDto) {
    return `This action updates a #${id} estatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} estatus`;
  }
}
