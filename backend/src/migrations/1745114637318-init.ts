import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1745114637318 implements MigrationInterface {
  name = 'Init1745114637318'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`registeredUsers\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullName\` varchar(100) NOT NULL, \`dateOfBirth\` date NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'REGISTERED_USER', UNIQUE INDEX \`IDX_e0cc9f59f1667bd74c96bbb809\` (\`email\`), INDEX \`IDX_ee0663a14e3852f4f4fa3f4e20\` (\`role\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
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
      `CREATE TABLE \`watchlists\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`isPublic\` tinyint NOT NULL DEFAULT 0, \`ownerId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`reports\` (\`id\` varchar(36) NOT NULL, \`reason\` enum ('Spam or scams', 'Hate speech or discrimination', 'Misinformation or false information', 'Harassment or bullying', 'Violence or threats of violence', 'Illegal content or activity', 'Sexual content or nudity') NOT NULL, \`type\` varchar(255) NOT NULL, \`reporterId\` varchar(36) NOT NULL, \`commentId\` varchar(36) NOT NULL, \`blogId\` varchar(36) NOT NULL, INDEX \`IDX_d5e66723d29c6f38b2ba70542d\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`comments\` (\`id\` varchar(36) NOT NULL, \`content\` text NOT NULL, \`date\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`type\` varchar(255) NOT NULL, \`userId\` varchar(36) NOT NULL, \`parentCommentId\` varchar(36) NULL, \`movieId\` varchar(36) NOT NULL, \`blogId\` varchar(36) NOT NULL, INDEX \`IDX_31c4b42dcb286e8ee825f0127f\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`tags\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`blogs\` (\`id\` varchar(36) NOT NULL, \`content\` text NOT NULL, \`dateCreated\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`ownerId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`like_interactions\` (\`id\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`movies_genres\` (\`movie_id\` varchar(36) NOT NULL, \`genre_id\` varchar(36) NOT NULL, INDEX \`IDX_4729d9b8d47986f936cb5e9540\` (\`movie_id\`), INDEX \`IDX_ef4fe5a96b6f83e9472bdaefbc\` (\`genre_id\`), PRIMARY KEY (\`movie_id\`, \`genre_id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`movies_casts\` (\`movie_id\` varchar(36) NOT NULL, \`cast_id\` varchar(36) NOT NULL, INDEX \`IDX_6f28c1a0e1dd6a646ae2d074ff\` (\`movie_id\`), INDEX \`IDX_9526b6488b6897f404194584d8\` (\`cast_id\`), PRIMARY KEY (\`movie_id\`, \`cast_id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`watchlists_movies\` (\`watchlist_id\` varchar(36) NOT NULL, \`movie_id\` varchar(36) NOT NULL, INDEX \`IDX_559f5f7d9dbec108467acd1f9a\` (\`watchlist_id\`), INDEX \`IDX_7f48c6d34503bd92b5fd66b06a\` (\`movie_id\`), PRIMARY KEY (\`watchlist_id\`, \`movie_id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`blogs_tags\` (\`blog_id\` varchar(36) NOT NULL, \`tag_id\` varchar(36) NOT NULL, INDEX \`IDX_377b848c1bf364f261f48c68bc\` (\`blog_id\`), INDEX \`IDX_30d6656ad4b7979788696aa470\` (\`tag_id\`), PRIMARY KEY (\`blog_id\`, \`tag_id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`like_interactions_users\` (\`like_interaction_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_fd90b482d7dd9f64fcdee0bbdd\` (\`like_interaction_id\`), INDEX \`IDX_9f0c39f25b3ac84e71187a6f34\` (\`user_id\`), PRIMARY KEY (\`like_interaction_id\`, \`user_id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`watchlists\` ADD CONSTRAINT \`FK_b2fef33469d6dab233474de2fb4\` FOREIGN KEY (\`ownerId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE \`blogs\` ADD CONSTRAINT \`FK_998d6c1e3c685955774e5195f49\` FOREIGN KEY (\`ownerId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE \`watchlists_movies\` ADD CONSTRAINT \`FK_559f5f7d9dbec108467acd1f9ac\` FOREIGN KEY (\`watchlist_id\`) REFERENCES \`watchlists\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`watchlists_movies\` ADD CONSTRAINT \`FK_7f48c6d34503bd92b5fd66b06a0\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`blogs_tags\` ADD CONSTRAINT \`FK_377b848c1bf364f261f48c68bc3\` FOREIGN KEY (\`blog_id\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`blogs_tags\` ADD CONSTRAINT \`FK_30d6656ad4b7979788696aa470c\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`like_interactions_users\` ADD CONSTRAINT \`FK_fd90b482d7dd9f64fcdee0bbdd0\` FOREIGN KEY (\`like_interaction_id\`) REFERENCES \`like_interactions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`like_interactions_users\` ADD CONSTRAINT \`FK_9f0c39f25b3ac84e71187a6f34c\` FOREIGN KEY (\`user_id\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`like_interactions_users\` DROP FOREIGN KEY \`FK_9f0c39f25b3ac84e71187a6f34c\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`like_interactions_users\` DROP FOREIGN KEY \`FK_fd90b482d7dd9f64fcdee0bbdd0\``,
    )
    await queryRunner.query(`ALTER TABLE \`blogs_tags\` DROP FOREIGN KEY \`FK_30d6656ad4b7979788696aa470c\``)
    await queryRunner.query(`ALTER TABLE \`blogs_tags\` DROP FOREIGN KEY \`FK_377b848c1bf364f261f48c68bc3\``)
    await queryRunner.query(`ALTER TABLE \`watchlists_movies\` DROP FOREIGN KEY \`FK_7f48c6d34503bd92b5fd66b06a0\``)
    await queryRunner.query(`ALTER TABLE \`watchlists_movies\` DROP FOREIGN KEY \`FK_559f5f7d9dbec108467acd1f9ac\``)
    await queryRunner.query(`ALTER TABLE \`movies_casts\` DROP FOREIGN KEY \`FK_9526b6488b6897f404194584d82\``)
    await queryRunner.query(`ALTER TABLE \`movies_casts\` DROP FOREIGN KEY \`FK_6f28c1a0e1dd6a646ae2d074ff8\``)
    await queryRunner.query(`ALTER TABLE \`movies_genres\` DROP FOREIGN KEY \`FK_ef4fe5a96b6f83e9472bdaefbc5\``)
    await queryRunner.query(`ALTER TABLE \`movies_genres\` DROP FOREIGN KEY \`FK_4729d9b8d47986f936cb5e9540e\``)
    await queryRunner.query(`ALTER TABLE \`blogs\` DROP FOREIGN KEY \`FK_998d6c1e3c685955774e5195f49\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_42a37ec3be9f871d4e44dd21bf9\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_bb2283b93a5414b9cfe834a181a\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4875672591221a61ace66f2d4f9\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``)
    await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_585d50a9854c9a4b8605470c8d2\``)
    await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_1a7a328279e62111bebddfc2649\``)
    await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_4353be8309ce86650def2f8572d\``)
    await queryRunner.query(`ALTER TABLE \`watchlists\` DROP FOREIGN KEY \`FK_b2fef33469d6dab233474de2fb4\``)
    await queryRunner.query(`DROP INDEX \`IDX_9f0c39f25b3ac84e71187a6f34\` ON \`like_interactions_users\``)
    await queryRunner.query(`DROP INDEX \`IDX_fd90b482d7dd9f64fcdee0bbdd\` ON \`like_interactions_users\``)
    await queryRunner.query(`DROP TABLE \`like_interactions_users\``)
    await queryRunner.query(`DROP INDEX \`IDX_30d6656ad4b7979788696aa470\` ON \`blogs_tags\``)
    await queryRunner.query(`DROP INDEX \`IDX_377b848c1bf364f261f48c68bc\` ON \`blogs_tags\``)
    await queryRunner.query(`DROP TABLE \`blogs_tags\``)
    await queryRunner.query(`DROP INDEX \`IDX_7f48c6d34503bd92b5fd66b06a\` ON \`watchlists_movies\``)
    await queryRunner.query(`DROP INDEX \`IDX_559f5f7d9dbec108467acd1f9a\` ON \`watchlists_movies\``)
    await queryRunner.query(`DROP TABLE \`watchlists_movies\``)
    await queryRunner.query(`DROP INDEX \`IDX_9526b6488b6897f404194584d8\` ON \`movies_casts\``)
    await queryRunner.query(`DROP INDEX \`IDX_6f28c1a0e1dd6a646ae2d074ff\` ON \`movies_casts\``)
    await queryRunner.query(`DROP TABLE \`movies_casts\``)
    await queryRunner.query(`DROP INDEX \`IDX_ef4fe5a96b6f83e9472bdaefbc\` ON \`movies_genres\``)
    await queryRunner.query(`DROP INDEX \`IDX_4729d9b8d47986f936cb5e9540\` ON \`movies_genres\``)
    await queryRunner.query(`DROP TABLE \`movies_genres\``)
    await queryRunner.query(`DROP TABLE \`like_interactions\``)
    await queryRunner.query(`DROP TABLE \`blogs\``)
    await queryRunner.query(`DROP INDEX \`IDX_d90243459a697eadb8ad56e909\` ON \`tags\``)
    await queryRunner.query(`DROP TABLE \`tags\``)
    await queryRunner.query(`DROP INDEX \`IDX_31c4b42dcb286e8ee825f0127f\` ON \`comments\``)
    await queryRunner.query(`DROP TABLE \`comments\``)
    await queryRunner.query(`DROP INDEX \`IDX_d5e66723d29c6f38b2ba70542d\` ON \`reports\``)
    await queryRunner.query(`DROP TABLE \`reports\``)
    await queryRunner.query(`DROP TABLE \`watchlists\``)
    await queryRunner.query(`DROP TABLE \`movies\``)
    await queryRunner.query(`DROP TABLE \`casts\``)
    await queryRunner.query(`DROP TABLE \`genres\``)
    await queryRunner.query(`DROP INDEX \`IDX_ee0663a14e3852f4f4fa3f4e20\` ON \`registeredUsers\``)
    await queryRunner.query(`DROP INDEX \`IDX_e0cc9f59f1667bd74c96bbb809\` ON \`registeredUsers\``)
    await queryRunner.query(`DROP TABLE \`registeredUsers\``)
  }
}
