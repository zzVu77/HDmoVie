import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1745115055506 implements MigrationInterface {
  name = 'Init1745115055506'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`like_interactions\` ADD \`blogId\` varchar(36) NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE \`like_interactions\` ADD UNIQUE INDEX \`IDX_bc8540090e8c59857b771b1550\` (\`blogId\`)`,
    )
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_bc8540090e8c59857b771b1550\` ON \`like_interactions\` (\`blogId\`)`,
    )
    await queryRunner.query(
      `ALTER TABLE \`like_interactions\` ADD CONSTRAINT \`FK_bc8540090e8c59857b771b1550a\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`like_interactions\` DROP FOREIGN KEY \`FK_bc8540090e8c59857b771b1550a\``)
    await queryRunner.query(`DROP INDEX \`REL_bc8540090e8c59857b771b1550\` ON \`like_interactions\``)
    await queryRunner.query(`ALTER TABLE \`like_interactions\` DROP INDEX \`IDX_bc8540090e8c59857b771b1550\``)
    await queryRunner.query(`ALTER TABLE \`like_interactions\` DROP COLUMN \`blogId\``)
  }
}
