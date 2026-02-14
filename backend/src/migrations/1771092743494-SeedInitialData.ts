import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

import { User } from "../users/user.entity";
import { Student } from "../students/student.entity";
import { TeachingEnvironment } from "../teaching_environments/teaching_environment.entity";

export class SeedInitialData1771092743494 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    const userRepo = queryRunner.manager.getRepository(User);
    const studentRepo = queryRunner.manager.getRepository(Student);
    const environmentRepo = queryRunner.manager.getRepository(TeachingEnvironment);

    // Criar admin
    const hashedPassword = await bcrypt.hash("123456", 10);

    await userRepo.save({
      username: "admin",
      password: hashedPassword,
    });

    // Criar ambientes
    const environments = await environmentRepo.save([
      { name: "Sala 101", type: "CLASSROOM" },
      { name: "Sala 102", type: "CLASSROOM" },
      { name: "Laboratório Física", type: "LABORATORY" },
      { name: "Laboratório Química", type: "LABORATORY" },
      { name: "Sala de Estudos", type: "STUDY_ROOM" },
    ]);

    // Criar alunos
    const students = await studentRepo.save([
      { name: "João" },
      { name: "Maria" },
      { name: "Carlos" },
      { name: "Ana" },
      { name: "Pedro" },
      { name: "Fernanda" },
    ]);

    // Vincular alunos às salas
    students[0].teachingEnvironments = [environments[0], environments[2]];
    students[1].teachingEnvironments = [environments[1]];
    students[2].teachingEnvironments = [environments[2], environments[3]];
    students[3].teachingEnvironments = [environments[4]];
    students[4].teachingEnvironments = [environments[0], environments[4]];
    students[5].teachingEnvironments = [environments[3]];

    await studentRepo.save(students);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    const userRepo = queryRunner.manager.getRepository(User);
    const studentRepo = queryRunner.manager.getRepository(Student);
    const environmentRepo = queryRunner.manager.getRepository(TeachingEnvironment);

    await userRepo.clear();
    await studentRepo.clear();
    await environmentRepo.clear();
  }
}
