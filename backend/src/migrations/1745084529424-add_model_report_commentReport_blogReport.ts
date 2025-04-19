import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddModelReportCommentReportBlogReport1745084529424 implements MigrationInterface {
  name = 'AddModelReportCommentReportBlogReport1745084529424'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`reports\` (\`id\` varchar(36) NOT NULL, \`reason\` enum ('Spam or scams', 'Hate speech or discrimination', 'Misinformation or false information', 'Harassment or bullying', 'Violence or threats of violence', 'Illegal content or activity', 'Sexual content or nudity') NOT NULL, \`type\` varchar(255) NOT NULL, \`reporterId\` varchar(36) NOT NULL, \`commentId\` varchar(36) NOT NULL, \`blogId\` varchar(36) NOT NULL, INDEX \`IDX_d5e66723d29c6f38b2ba70542d\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_4353be8309ce86650def2f8572d\` FOREIGN KEY (\`reporterId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_1a7a328279e62111bebddfc2649\` FOREIGN KEY (\`commentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_585d50a9854c9a4b8605470c8d2\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_585d50a9854c9a4b8605470c8d2\``)
    await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_1a7a328279e62111bebddfc2649\``)
    await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_4353be8309ce86650def2f8572d\``)
    await queryRunner.query(`DROP INDEX \`IDX_d5e66723d29c6f38b2ba70542d\` ON \`reports\``)
    await queryRunner.query(`DROP TABLE \`reports\``)
  }
}
