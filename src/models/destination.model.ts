import {Entity, model, property} from '@loopback/repository';

@model()
export class Destination extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  weather: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isDreamDestination: boolean;

  constructor(data?: Partial<Destination>) {
    super(data);
  }
}

export interface DestinationRelations {
  // describe navigational properties here
}

export type DestinationWithRelations = Destination & DestinationRelations;
