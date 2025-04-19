import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddModelCommentMovieCommentBlogComment1745081940057 implements MigrationInterface {
  name = 'AddModelCommentMovieCommentBlogComment1745081940057'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`comments\` (\`id\` varchar(36) NOT NULL, \`content\` text NOT NULL, \`date\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`type\` varchar(255) NOT NULL, \`userId\` varchar(36) NOT NULL, \`parentCommentId\` varchar(36) NULL, \`movieId\` varchar(36) NOT NULL, \`blogId\` varchar(36) NOT NULL, INDEX \`IDX_31c4b42dcb286e8ee825f0127f\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4875672591221a61ace66f2d4f9\` FOREIGN KEY (\`parentCommentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_bb2283b93a5414b9cfe834a181a\` FOREIGN KEY (\`movieId\`) REFERENCES \`movies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_42a37ec3be9f871d4e44dd21bf9\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_42a37ec3be9f871d4e44dd21bf9\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_bb2283b93a5414b9cfe834a181a\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4875672591221a61ace66f2d4f9\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``)
    await queryRunner.query(`DROP INDEX \`IDX_31c4b42dcb286e8ee825f0127f\` ON \`comments\``)
    await queryRunner.query(`DROP TABLE \`comments\``)
  }
}
