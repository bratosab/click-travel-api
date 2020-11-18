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
import {Destination} from '../models';
import {DestinationRepository} from '../repositories';

export class DestinationController {
  constructor(
    @repository(DestinationRepository)
    public destinationRepository : DestinationRepository,
  ) {}

  @post('/destinations', {
    responses: {
      '200': {
        description: 'Destination model instance',
        content: {'application/json': {schema: getModelSchemaRef(Destination)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Destination, {
            title: 'NewDestination',
            
          }),
        },
      },
    })
    destination: Destination,
  ): Promise<Destination> {
    return this.destinationRepository.create(destination);
  }

  @get('/destinations/count', {
    responses: {
      '200': {
        description: 'Destination model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Destination) where?: Where<Destination>,
  ): Promise<Count> {
    return this.destinationRepository.count(where);
  }

  @get('/destinations', {
    responses: {
      '200': {
        description: 'Array of Destination model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Destination, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Destination) filter?: Filter<Destination>,
  ): Promise<Destination[]> {
    return this.destinationRepository.find(filter);
  }

  @patch('/destinations', {
    responses: {
      '200': {
        description: 'Destination PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Destination, {partial: true}),
        },
      },
    })
    destination: Destination,
    @param.where(Destination) where?: Where<Destination>,
  ): Promise<Count> {
    return this.destinationRepository.updateAll(destination, where);
  }

  @get('/destinations/{id}', {
    responses: {
      '200': {
        description: 'Destination model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Destination, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Destination, {exclude: 'where'}) filter?: FilterExcludingWhere<Destination>
  ): Promise<Destination> {
    return this.destinationRepository.findById(id, filter);
  }

  @patch('/destinations/{id}', {
    responses: {
      '204': {
        description: 'Destination PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Destination, {partial: true}),
        },
      },
    })
    destination: Destination,
  ): Promise<void> {
    await this.destinationRepository.updateById(id, destination);
  }

  @put('/destinations/{id}', {
    responses: {
      '204': {
        description: 'Destination PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() destination: Destination,
  ): Promise<void> {
    await this.destinationRepository.replaceById(id, destination);
  }

  @del('/destinations/{id}', {
    responses: {
      '204': {
        description: 'Destination DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.destinationRepository.deleteById(id);
  }
}
