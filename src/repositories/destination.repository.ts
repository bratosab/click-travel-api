import {DefaultCrudRepository} from '@loopback/repository';
import {Destination, DestinationRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DestinationRepository extends DefaultCrudRepository<
  Destination,
  typeof Destination.prototype.code,
  DestinationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Destination, dataSource);
  }
}
