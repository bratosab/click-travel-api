import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Ticket} from '../models';
import {TicketRepository} from '../repositories';

export class TicketController {
  constructor(
    @repository(TicketRepository)
    public ticketRepository : TicketRepository,
  ) {}

  @post('/tickets', {
    responses: {
      '200': {
        description: 'Ticket model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ticket)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticket, {
            title: 'NewTicket',
            exclude: ['number'],
          }),
        },
      },
    })
    ticket: Omit<Ticket, 'number'>,
  ): Promise<Ticket> {
    return this.ticketRepository.create(ticket);
  }

  @get('/tickets/count', {
    responses: {
      '200': {
        description: 'Ticket model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Ticket) where?: Where<Ticket>,
  ): Promise<Count> {
    return this.ticketRepository.count(where);
  }

  @get('/tickets', {
    responses: {
      '200': {
        description: 'Array of Ticket model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Ticket, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Ticket) filter?: Filter<Ticket>,
  ): Promise<Ticket[]> {
    return this.ticketRepository.find(filter);
  }

  @patch('/tickets', {
    responses: {
      '200': {
        description: 'Ticket PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticket, {partial: true}),
        },
      },
    })
    ticket: Ticket,
    @param.where(Ticket) where?: Where<Ticket>,
  ): Promise<Count> {
    return this.ticketRepository.updateAll(ticket, where);
  }

  @get('/tickets/{id}', {
    responses: {
      '200': {
        description: 'Ticket model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ticket, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Ticket, {exclude: 'where'}) filter?: FilterExcludingWhere<Ticket>
  ): Promise<Ticket> {
    return this.ticketRepository.findById(id, filter);
  }

  @patch('/tickets/{id}', {
    responses: {
      '204': {
        description: 'Ticket PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticket, {partial: true}),
        },
      },
    })
    ticket: Ticket,
  ): Promise<void> {
    await this.ticketRepository.updateById(id, ticket);
  }

  @put('/tickets/{id}', {
    responses: {
      '204': {
        description: 'Ticket PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ticket: Ticket,
  ): Promise<void> {
    await this.ticketRepository.replaceById(id, ticket);
  }

  @del('/tickets/{id}', {
    responses: {
      '204': {
        description: 'Ticket DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ticketRepository.deleteById(id);
  }
}
