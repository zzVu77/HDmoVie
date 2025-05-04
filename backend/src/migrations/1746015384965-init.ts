import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1746015384965 implements MigrationInterface {
  name = 'Init1746015384965'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`registeredUsers\` ADD \`refreshToken\` varchar(512) NULL`)
    await queryRunner.query(`ALTER TABLE \`registeredUsers\` ADD \`refreshTokenExpiresAt\` timestamp NULL`)
    await queryRunner.query(`ALTER TABLE \`casts\` CHANGE \`profilePath\` \`profilePath\` text NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`casts\` CHANGE \`profilePath\` \`profilePath\` text NULL`)
    await queryRunner.query(`ALTER TABLE \`registeredUsers\` DROP COLUMN \`refreshTokenExpiresAt\``)
    await queryRunner.query(`ALTER TABLE \`registeredUsers\` DROP COLUMN \`refreshToken\``)
  }
}
