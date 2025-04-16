import { MigrationInterface, QueryRunner } from 'typeorm'

export class Test11744817899524 implements MigrationInterface {
  name = 'Test11744817899524'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`accounts\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullName\` varchar(100) NOT NULL, \`dateOfBirth\` date NOT NULL, \`type\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` (\`email\`), INDEX \`IDX_62471155681515721de014a625\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`genres\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`movies\` (\`id\` varchar(36) NOT NULL, \`description\` text NOT NULL, \`releaseYear\` int NOT NULL, \`director\` varchar(100) NOT NULL, \`trailerSource\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`posters\` (\`id\` varchar(36) NOT NULL, \`source\` text NOT NULL, \`movie_id\` varchar(36) NULL, UNIQUE INDEX \`REL_22aa485b332b5c1f2bfe438565\` (\`movie_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`movies_genres\` (\`movie_id\` varchar(36) NOT NULL, \`genre_id\` varchar(36) NOT NULL, INDEX \`IDX_4729d9b8d47986f936cb5e9540\` (\`movie_id\`), INDEX \`IDX_ef4fe5a96b6f83e9472bdaefbc\` (\`genre_id\`), PRIMARY KEY (\`movie_id\`, \`genre_id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`posters\` ADD CONSTRAINT \`FK_22aa485b332b5c1f2bfe4385652\` FOREIGN KEY (\`movie_id\`) REFERENCES \`posters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`movies_genres\` ADD CONSTRAINT \`FK_4729d9b8d47986f936cb5e9540e\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`movies_genres\` ADD CONSTRAINT \`FK_ef4fe5a96b6f83e9472bdaefbc5\` FOREIGN KEY (\`genre_id\`) REFERENCES \`genres\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`movies_genres\` DROP FOREIGN KEY \`FK_ef4fe5a96b6f83e9472bdaefbc5\``)
    await queryRunner.query(`ALTER TABLE \`movies_genres\` DROP FOREIGN KEY \`FK_4729d9b8d47986f936cb5e9540e\``)
    await queryRunner.query(`ALTER TABLE \`posters\` DROP FOREIGN KEY \`FK_22aa485b332b5c1f2bfe4385652\``)
    await queryRunner.query(`DROP INDEX \`IDX_ef4fe5a96b6f83e9472bdaefbc\` ON \`movies_genres\``)
    await queryRunner.query(`DROP INDEX \`IDX_4729d9b8d47986f936cb5e9540\` ON \`movies_genres\``)
    await queryRunner.query(`DROP TABLE \`movies_genres\``)
    await queryRunner.query(`DROP INDEX \`REL_22aa485b332b5c1f2bfe438565\` ON \`posters\``)
    await queryRunner.query(`DROP TABLE \`posters\``)
    await queryRunner.query(`DROP TABLE \`movies\``)
    await queryRunner.query(`DROP TABLE \`genres\``)
    await queryRunner.query(`DROP INDEX \`IDX_62471155681515721de014a625\` ON \`accounts\``)
    await queryRunner.query(`DROP INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` ON \`accounts\``)
    await queryRunner.query(`DROP TABLE \`accounts\``)
  }
}
