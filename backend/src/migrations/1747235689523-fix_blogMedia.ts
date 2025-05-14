import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixBlogMedia1747235689523 implements MigrationInterface {
  name = 'FixBlogMedia1747235689523'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`blog_media\` DROP FOREIGN KEY \`FK_7c4f1f8db2b51dd47e49f0093a4\``)
    await queryRunner.query(`ALTER TABLE \`blog_media\` CHANGE \`blogId\` \`blogId\` varchar(36) NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE \`blog_media\` ADD CONSTRAINT \`FK_7c4f1f8db2b51dd47e49f0093a4\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`blog_media\` DROP FOREIGN KEY \`FK_7c4f1f8db2b51dd47e49f0093a4\``)
    await queryRunner.query(`ALTER TABLE \`blog_media\` CHANGE \`blogId\` \`blogId\` varchar(36) NULL`)
    await queryRunner.query(
      `ALTER TABLE \`blog_media\` ADD CONSTRAINT \`FK_7c4f1f8db2b51dd47e49f0093a4\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
