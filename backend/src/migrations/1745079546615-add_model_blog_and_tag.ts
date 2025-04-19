import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddModelBlogAndTag1745079546615 implements MigrationInterface {
  name = 'AddModelBlogAndTag1745079546615'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tags\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`IDX_d90243459a697eadb8ad56e909\` ON \`tags\``)
    await queryRunner.query(`DROP TABLE \`tags\``)
  }
}
