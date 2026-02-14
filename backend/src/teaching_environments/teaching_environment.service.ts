import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { TeachingEnvironment } from './teaching_environment.entity';

@Injectable()
export class TeachingEnvironmentService {
  constructor(
    @InjectRepository(TeachingEnvironment)
    private TeachingEnvironmentRepository: Repository<TeachingEnvironment>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async findAll(): Promise<TeachingEnvironment[]> {
    return await this.TeachingEnvironmentRepository.find();
  }

  // Incrições por mês
  async getTeachingEnvironmentsPerMonth(
    year?: number,
    status?: number,
    date_filter?: number,
  ): Promise<{ month: number; count: number }[]> {
    let whereClause = '';

    // Filtro de ano
    if (year !== undefined) {
      whereClause = `WHERE YEAR(start_date) = ${year}`;
    }

    // Filtro de status
    if (status !== undefined) {
      if (whereClause != '') {
        whereClause = whereClause + ' and ';
      } else {
        whereClause = 'WHERE ';
      }
      whereClause = whereClause + `status = ${status}`;
    }

    // Filtro de tipo de data
    let dateFilter = 'start_date';
    if (date_filter != undefined) {
      if (date_filter == 2) {
        dateFilter = 'status_date';
      } else if (date_filter == 3) {
        dateFilter = 'cancel_date';
      } else {
        dateFilter = 'next_cycle';
      }
    }

    const query = `
        SELECT MONTH(${dateFilter}) as month, COUNT(*) as count
        FROM TeachingEnvironments
        ${whereClause}
        GROUP BY MONTH(${dateFilter})
    `;

    const result = await this.entityManager.query(query);
    return result;
  }

  // Cobranças por mês
  async getTeachingEnvironmentChargesPerMonth(
    year?: number,
    status?: number,
    date_filter?: number,
  ): Promise<{ month: number; count: number }[]> {
    let whereClause = '';

    // Filtro de ano
    if (year !== undefined) {
      whereClause = `WHERE YEAR(start_date) = ${year}`;
    }

    // Filtro de status
    if (status !== undefined) {
      if (whereClause != '') {
        whereClause = whereClause + ' and ';
      } else {
        whereClause = 'WHERE ';
      }
      whereClause = whereClause + `status = ${status}`;
    }

    // Filtro de tipo de data
    let dateFilter = 'start_date';
    if (date_filter != undefined) {
      if (date_filter == 2) {
        dateFilter = 'status_date';
      } else if (date_filter == 3) {
        dateFilter = 'cancel_date';
      } else {
        dateFilter = 'next_cycle';
      }
    }

    const query = `
      SELECT MONTH(${dateFilter}) as month, SUM(quantity_of_charges) as count
      FROM TeachingEnvironments
      ${whereClause}
      GROUP BY MONTH(${dateFilter})
    `;
    const result = await this.entityManager.query(query);
    return result;
  }

  // Monthly Recurring Revenue
  async getMonthlyRecurringRevenue(
    year?: number,
    status?: number,
    date_filter?: number,
  ): Promise<{ month: number; count: number }[]> {
    let whereClause = '';

    // Filtro de ano
    if (year !== undefined) {
      whereClause = `WHERE YEAR(start_date) = ${year}`;
    }

    // Filtro de status
    if (status !== undefined) {
      if (whereClause != '') {
        whereClause = whereClause + ' and ';
      } else {
        whereClause = 'WHERE ';
      }
      whereClause = whereClause + `status = ${status}`;
    }

    // Filtro de tipo de data
    let dateFilter = 'start_date';
    if (date_filter != undefined) {
      if (date_filter == 2) {
        dateFilter = 'status_date';
      } else if (date_filter == 3) {
        dateFilter = 'cancel_date';
      } else {
        dateFilter = 'next_cycle';
      }
    }

    const query = `
      SELECT MONTH(${dateFilter}) as month, SUM(value) as count
      FROM TeachingEnvironments
      ${whereClause}
      GROUP BY MONTH(${dateFilter})
    `;
    const result = await this.entityManager.query(query);
    return result;
  }
}
