import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddModelRate1745146455569 implements MigrationInterface {
  name = 'AddModelRate1745146455569'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`rates\` (\`id\` varchar(36) NOT NULL, \`rateScore\` float NOT NULL, \`userId\` varchar(36) NOT NULL, \`movieId\` varchar(36) NOT NULL, UNIQUE INDEX \`IDX_b0913c3e6c6a67a3148a28ddb5\` (\`userId\`, \`movieId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD CONSTRAINT \`FK_cd296144bf64811ed81e3058af1\` FOREIGN KEY (\`userId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD CONSTRAINT \`FK_9fc25664c414f181525e1e74a80\` FOREIGN KEY (\`movieId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`rates\` DROP FOREIGN KEY \`FK_9fc25664c414f181525e1e74a80\``)
    await queryRunner.query(`ALTER TABLE \`rates\` DROP FOREIGN KEY \`FK_cd296144bf64811ed81e3058af1\``)
    await queryRunner.query(`DROP INDEX \`IDX_b0913c3e6c6a67a3148a28ddb5\` ON \`rates\``)
    await queryRunner.query(`DROP TABLE \`rates\``)
  }
}
