import {DefaultCrudRepository} from '@loopback/repository';
import {Ticket, TicketRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TicketRepository extends DefaultCrudRepository<
  Ticket,
  typeof Ticket.prototype.number,
  TicketRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Ticket, dataSource);
  }
}
