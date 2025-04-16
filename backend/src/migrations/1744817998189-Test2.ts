import { MigrationInterface, QueryRunner } from 'typeorm'

export class Test21744817998189 implements MigrationInterface {
  name = 'Test21744817998189'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`movies\` ADD \`name\` text NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`movies\` DROP COLUMN \`name\``)
  }
}
