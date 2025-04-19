import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddModelBlog1745079619380 implements MigrationInterface {
  name = 'AddModelBlog1745079619380'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`blogs\` (\`id\` varchar(36) NOT NULL, \`content\` text NOT NULL, \`dateCreated\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`ownerId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`blogs_tags\` (\`blog_id\` varchar(36) NOT NULL, \`tag_id\` varchar(36) NOT NULL, INDEX \`IDX_377b848c1bf364f261f48c68bc\` (\`blog_id\`), INDEX \`IDX_30d6656ad4b7979788696aa470\` (\`tag_id\`), PRIMARY KEY (\`blog_id\`, \`tag_id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`blogs\` ADD CONSTRAINT \`FK_998d6c1e3c685955774e5195f49\` FOREIGN KEY (\`ownerId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`blogs_tags\` ADD CONSTRAINT \`FK_377b848c1bf364f261f48c68bc3\` FOREIGN KEY (\`blog_id\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`blogs_tags\` ADD CONSTRAINT \`FK_30d6656ad4b7979788696aa470c\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`blogs_tags\` DROP FOREIGN KEY \`FK_30d6656ad4b7979788696aa470c\``)
    await queryRunner.query(`ALTER TABLE \`blogs_tags\` DROP FOREIGN KEY \`FK_377b848c1bf364f261f48c68bc3\``)
    await queryRunner.query(`ALTER TABLE \`blogs\` DROP FOREIGN KEY \`FK_998d6c1e3c685955774e5195f49\``)
    await queryRunner.query(`DROP INDEX \`IDX_30d6656ad4b7979788696aa470\` ON \`blogs_tags\``)
    await queryRunner.query(`DROP INDEX \`IDX_377b848c1bf364f261f48c68bc\` ON \`blogs_tags\``)
    await queryRunner.query(`DROP TABLE \`blogs_tags\``)
    await queryRunner.query(`DROP TABLE \`blogs\``)
  }
}
