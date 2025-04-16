import { MigrationInterface, QueryRunner } from 'typeorm'

export class Test31744818141167 implements MigrationInterface {
  name = 'Test31744818141167'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`name\` \`title\` text NOT NULL`)
    await queryRunner.query(`ALTER TABLE \`movies\` DROP COLUMN \`title\``)
    await queryRunner.query(`ALTER TABLE \`movies\` ADD \`title\` varchar(255) NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`movies\` DROP COLUMN \`title\``)
    await queryRunner.query(`ALTER TABLE \`movies\` ADD \`title\` text NOT NULL`)
    await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`title\` \`name\` text NOT NULL`)
  }
}
