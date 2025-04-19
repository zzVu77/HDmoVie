import { MigrationInterface, QueryRunner } from 'typeorm'

export class RefactorModel1745060720266 implements MigrationInterface {
  name = 'RefactorModel1745060720266'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`registeredUsers\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullName\` varchar(100) NOT NULL, \`dateOfBirth\` date NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'REGISTERED_USER', UNIQUE INDEX \`IDX_e0cc9f59f1667bd74c96bbb809\` (\`email\`), INDEX \`IDX_ee0663a14e3852f4f4fa3f4e20\` (\`role\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`genres\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`casts\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`profilePath\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`movies\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`releaseYear\` datetime NOT NULL, \`trailerSource\` text NOT NULL, \`posterSource\` text NOT NULL, \`backdropSource\` text NOT NULL, \`voteAvg\` float NOT NULL, \`voteCount\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`movies_genres\` (\`movie_id\` varchar(36) NOT NULL, \`genre_id\` varchar(36) NOT NULL, INDEX \`IDX_4729d9b8d47986f936cb5e9540\` (\`movie_id\`), INDEX \`IDX_ef4fe5a96b6f83e9472bdaefbc\` (\`genre_id\`), PRIMARY KEY (\`movie_id\`, \`genre_id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`movies_casts\` (\`movie_id\` varchar(36) NOT NULL, \`cast_id\` varchar(36) NOT NULL, INDEX \`IDX_6f28c1a0e1dd6a646ae2d074ff\` (\`movie_id\`), INDEX \`IDX_9526b6488b6897f404194584d8\` (\`cast_id\`), PRIMARY KEY (\`movie_id\`, \`cast_id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`movies_genres\` ADD CONSTRAINT \`FK_4729d9b8d47986f936cb5e9540e\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`movies_genres\` ADD CONSTRAINT \`FK_ef4fe5a96b6f83e9472bdaefbc5\` FOREIGN KEY (\`genre_id\`) REFERENCES \`genres\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`movies_casts\` ADD CONSTRAINT \`FK_6f28c1a0e1dd6a646ae2d074ff8\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`movies_casts\` ADD CONSTRAINT \`FK_9526b6488b6897f404194584d82\` FOREIGN KEY (\`cast_id\`) REFERENCES \`casts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`movies_casts\` DROP FOREIGN KEY \`FK_9526b6488b6897f404194584d82\``)
    await queryRunner.query(`ALTER TABLE \`movies_casts\` DROP FOREIGN KEY \`FK_6f28c1a0e1dd6a646ae2d074ff8\``)
    await queryRunner.query(`ALTER TABLE \`movies_genres\` DROP FOREIGN KEY \`FK_ef4fe5a96b6f83e9472bdaefbc5\``)
    await queryRunner.query(`ALTER TABLE \`movies_genres\` DROP FOREIGN KEY \`FK_4729d9b8d47986f936cb5e9540e\``)
    await queryRunner.query(`DROP INDEX \`IDX_9526b6488b6897f404194584d8\` ON \`movies_casts\``)
    await queryRunner.query(`DROP INDEX \`IDX_6f28c1a0e1dd6a646ae2d074ff\` ON \`movies_casts\``)
    await queryRunner.query(`DROP TABLE \`movies_casts\``)
    await queryRunner.query(`DROP INDEX \`IDX_ef4fe5a96b6f83e9472bdaefbc\` ON \`movies_genres\``)
    await queryRunner.query(`DROP INDEX \`IDX_4729d9b8d47986f936cb5e9540\` ON \`movies_genres\``)
    await queryRunner.query(`DROP TABLE \`movies_genres\``)
    await queryRunner.query(`DROP TABLE \`movies\``)
    await queryRunner.query(`DROP TABLE \`casts\``)
    await queryRunner.query(`DROP TABLE \`genres\``)
    await queryRunner.query(`DROP INDEX \`IDX_ee0663a14e3852f4f4fa3f4e20\` ON \`registeredUsers\``)
    await queryRunner.query(`DROP INDEX \`IDX_e0cc9f59f1667bd74c96bbb809\` ON \`registeredUsers\``)
    await queryRunner.query(`DROP TABLE \`registeredUsers\``)
  }
}
