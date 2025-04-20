import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1745135833737 implements MigrationInterface {
  name = 'Init1745135833737'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`watchlists\` DROP FOREIGN KEY \`FK_b2fef33469d6dab233474de2fb4\``)
    await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_1a7a328279e62111bebddfc2649\``)
    await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_4353be8309ce86650def2f8572d\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_59ca06b1bcf1ad63cb253f2965c\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_692a909ee0fa9383e7859f9b406\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_9faba56a12931cf4e38f9dddb49\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_b47807ec432524080fc20e0501c\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_ca9c53b38f30059b0c452f2136e\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_bb2283b93a5414b9cfe834a181a\``)
    await queryRunner.query(`ALTER TABLE \`like_interactions\` DROP FOREIGN KEY \`FK_bc8540090e8c59857b771b1550a\``)
    await queryRunner.query(`ALTER TABLE \`casts\` CHANGE \`profilePath\` \`profilePath\` text NULL`)
    await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`trailerSource\` \`trailerSource\` text NULL`)
    await queryRunner.query(
      `ALTER TABLE \`watchlists\` ADD CONSTRAINT \`FK_b2fef33469d6dab233474de2fb4\` FOREIGN KEY (\`ownerId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_4353be8309ce86650def2f8572d\` FOREIGN KEY (\`reporterId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_1a7a328279e62111bebddfc2649\` FOREIGN KEY (\`commentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_59ca06b1bcf1ad63cb253f2965c\` FOREIGN KEY (\`ownerId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_b47807ec432524080fc20e0501c\` FOREIGN KEY (\`reportId\`) REFERENCES \`reports\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_692a909ee0fa9383e7859f9b406\` FOREIGN KEY (\`userId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_ca9c53b38f30059b0c452f2136e\` FOREIGN KEY (\`followerId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_9faba56a12931cf4e38f9dddb49\` FOREIGN KEY (\`commentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_bb2283b93a5414b9cfe834a181a\` FOREIGN KEY (\`movieId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`like_interactions\` ADD CONSTRAINT \`FK_bc8540090e8c59857b771b1550a\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`like_interactions\` DROP FOREIGN KEY \`FK_bc8540090e8c59857b771b1550a\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_bb2283b93a5414b9cfe834a181a\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_9faba56a12931cf4e38f9dddb49\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_ca9c53b38f30059b0c452f2136e\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_692a909ee0fa9383e7859f9b406\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_b47807ec432524080fc20e0501c\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_59ca06b1bcf1ad63cb253f2965c\``)
    await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_1a7a328279e62111bebddfc2649\``)
    await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_4353be8309ce86650def2f8572d\``)
    await queryRunner.query(`ALTER TABLE \`watchlists\` DROP FOREIGN KEY \`FK_b2fef33469d6dab233474de2fb4\``)
    await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`trailerSource\` \`trailerSource\` text NOT NULL`)
    await queryRunner.query(`ALTER TABLE \`casts\` CHANGE \`profilePath\` \`profilePath\` text NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE \`like_interactions\` ADD CONSTRAINT \`FK_bc8540090e8c59857b771b1550a\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_bb2283b93a5414b9cfe834a181a\` FOREIGN KEY (\`movieId\`) REFERENCES \`movies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_ca9c53b38f30059b0c452f2136e\` FOREIGN KEY (\`followerId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_b47807ec432524080fc20e0501c\` FOREIGN KEY (\`reportId\`) REFERENCES \`reports\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_9faba56a12931cf4e38f9dddb49\` FOREIGN KEY (\`commentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_692a909ee0fa9383e7859f9b406\` FOREIGN KEY (\`userId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_59ca06b1bcf1ad63cb253f2965c\` FOREIGN KEY (\`ownerId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_4353be8309ce86650def2f8572d\` FOREIGN KEY (\`reporterId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_1a7a328279e62111bebddfc2649\` FOREIGN KEY (\`commentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`watchlists\` ADD CONSTRAINT \`FK_b2fef33469d6dab233474de2fb4\` FOREIGN KEY (\`ownerId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }
}
