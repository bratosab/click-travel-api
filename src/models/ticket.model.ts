import {Entity, model, property} from '@loopback/repository';

@model()
export class Ticket extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  passenger: string;

  @property({
    type: 'string',
    required: true,
  })
  flight: string;

  @property({
    type: 'string',
    required: true,
  })
  from: string;

  @property({
    type: 'string',
    required: true,
  })
  to: string;

  @property({
    type: 'string',
    required: true,
  })
  class: string;

  @property({
    type: 'string',
    required: true,
  })
  gate: string;

  @property({
    type: 'string',
    required: true,
  })
  time: string;

  @property({
    type: 'string',
    required: true,
  })
  seat: string;

  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  number?: number;

  constructor(data?: Partial<Ticket>) {
    super(data);
  }
}

export interface TicketRelations {
  // describe navigational properties here
}

export type TicketWithRelations = Ticket & TicketRelations;
