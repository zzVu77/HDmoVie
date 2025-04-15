import { MigrationInterface, QueryRunner } from 'typeorm'

export class Test1744740670522 implements MigrationInterface {
  name = 'Test1744740670522'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`accounts\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullName\` varchar(100) NOT NULL, \`dateOfBirth\` date NOT NULL, \`type\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` (\`email\`), INDEX \`IDX_62471155681515721de014a625\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_62471155681515721de014a625\` ON \`accounts\``)
    await queryRunner.query(`DROP INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` ON \`accounts\``)
    await queryRunner.query(`DROP TABLE \`accounts\``)
  }
}
