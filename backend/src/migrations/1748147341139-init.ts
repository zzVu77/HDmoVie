import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1748147341139 implements MigrationInterface {
  name = 'Init1748147341139'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tags\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`registeredUsers\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullName\` varchar(100) NOT NULL, \`dateOfBirth\` date NOT NULL, \`refreshToken\` varchar(512) NULL, \`refreshTokenExpiresAt\` timestamp NULL, \`role\` varchar(255) NOT NULL DEFAULT 'REGISTERED_USER', UNIQUE INDEX \`IDX_e0cc9f59f1667bd74c96bbb809\` (\`email\`), INDEX \`IDX_ee0663a14e3852f4f4fa3f4e20\` (\`role\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`genres\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`casts\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`profilePath\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`movies\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`releaseYear\` date NOT NULL, \`trailerSource\` text NULL, \`posterSource\` text NOT NULL, \`backdropSource\` text NOT NULL, \`voteAvg\` float NOT NULL, \`voteCount\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`rates\` (\`id\` varchar(36) NOT NULL, \`rateScore\` float NOT NULL, \`userId\` varchar(36) NOT NULL, \`movieId\` varchar(36) NOT NULL, UNIQUE INDEX \`IDX_b0913c3e6c6a67a3148a28ddb5\` (\`userId\`, \`movieId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`watchlists\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`isPublic\` tinyint NOT NULL DEFAULT 0, \`ownerId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`reports\` (\`id\` varchar(36) NOT NULL, \`reason\` enum ('Spam or scams', 'Hate speech or discrimination', 'Misinformation or false information', 'Harassment or bullying', 'Violence or threats of violence', 'Illegal content or activity', 'Sexual content or nudity') NOT NULL, \`type\` varchar(255) NOT NULL, \`reporterId\` varchar(36) NOT NULL, \`commentId\` varchar(36) NULL, \`blogId\` varchar(36) NULL, INDEX \`IDX_d5e66723d29c6f38b2ba70542d\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`notifications\` (\`id\` varchar(36) NOT NULL, \`time\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`status\` varchar(255) NOT NULL DEFAULT 'UNREAD', \`type\` varchar(255) NOT NULL, \`ownerId\` varchar(36) NOT NULL, \`reportId\` varchar(36) NULL, \`followerId\` varchar(36) NULL, \`likeInteractionId\` varchar(36) NULL, \`commentId\` varchar(36) NULL, UNIQUE INDEX \`REL_9d1f7644780fbd96bdc1946ee1\` (\`likeInteractionId\`), INDEX \`IDX_aef1c7aef3725068e5540f8f00\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`blog_media\` (\`id\` varchar(36) NOT NULL, \`url\` text NOT NULL, \`blogId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`blogs\` (\`id\` varchar(36) NOT NULL, \`content\` text NOT NULL, \`dateCreated\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`ownerId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`like_interactions\` (\`id\` varchar(36) NOT NULL, \`blogId\` varchar(36) NOT NULL, UNIQUE INDEX \`REL_bc8540090e8c59857b771b1550\` (\`blogId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`comments\` (\`id\` varchar(36) NOT NULL, \`content\` text NOT NULL, \`date\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`type\` varchar(255) NOT NULL, \`userId\` varchar(36) NOT NULL, \`parentCommentId\` varchar(36) NULL, \`movieId\` varchar(36) NULL, \`blogId\` varchar(36) NULL, INDEX \`IDX_31c4b42dcb286e8ee825f0127f\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`follow_interactions\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(36) NOT NULL, UNIQUE INDEX \`REL_83767cd14c042454b693c34d0a\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`movies_genres\` (\`movieId\` varchar(36) NOT NULL, \`genreId\` varchar(36) NOT NULL, INDEX \`IDX_bc4c63354dccac2bea89b8fc78\` (\`movieId\`), INDEX \`IDX_d7936095d9ff2718d896f9f943\` (\`genreId\`), PRIMARY KEY (\`movieId\`, \`genreId\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`movies_casts\` (\`movieId\` varchar(36) NOT NULL, \`castId\` varchar(36) NOT NULL, INDEX \`IDX_593a2a928373acfa0974229c97\` (\`movieId\`), INDEX \`IDX_3b7b2a0df647167c8458cc79f5\` (\`castId\`), PRIMARY KEY (\`movieId\`, \`castId\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`watchlists_movies\` (\`watchlistId\` varchar(36) NOT NULL, \`movieId\` varchar(36) NOT NULL, INDEX \`IDX_cf4a88578acb5c0a36bd1d5e6e\` (\`watchlistId\`), INDEX \`IDX_5b5a4574e9ee9e1de3f090716a\` (\`movieId\`), PRIMARY KEY (\`watchlistId\`, \`movieId\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`blogs_tags\` (\`blogId\` varchar(36) NOT NULL, \`tagId\` varchar(36) NOT NULL, INDEX \`IDX_abe1f14bc72b0f16746a301adf\` (\`blogId\`), INDEX \`IDX_f65ff2ea7ef79891b3277f1a3c\` (\`tagId\`), PRIMARY KEY (\`blogId\`, \`tagId\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`like_interactions_users\` (\`likeInteractionId\` varchar(36) NOT NULL, \`userId\` varchar(36) NOT NULL, INDEX \`IDX_25a7e961906ca420a43804d870\` (\`likeInteractionId\`), INDEX \`IDX_421d465265a2f653ea5a601e08\` (\`userId\`), PRIMARY KEY (\`likeInteractionId\`, \`userId\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`followers_interactions_users\` (\`followInteractionId\` varchar(36) NOT NULL, \`userId\` varchar(36) NOT NULL, INDEX \`IDX_4a1fa7c1a2d3da538a05bdeede\` (\`followInteractionId\`), INDEX \`IDX_bffbb5fb067bf1bea82f73bb5a\` (\`userId\`), PRIMARY KEY (\`followInteractionId\`, \`userId\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`following_interactions_users\` (\`followInteractionId\` varchar(36) NOT NULL, \`userId\` varchar(36) NOT NULL, INDEX \`IDX_7dd683662c267d255029200568\` (\`followInteractionId\`), INDEX \`IDX_85eea8ad0dadc9ffda2c7b0320\` (\`userId\`), PRIMARY KEY (\`followInteractionId\`, \`userId\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD CONSTRAINT \`FK_cd296144bf64811ed81e3058af1\` FOREIGN KEY (\`userId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD CONSTRAINT \`FK_9fc25664c414f181525e1e74a80\` FOREIGN KEY (\`movieId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
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
      `ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_585d50a9854c9a4b8605470c8d2\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_59ca06b1bcf1ad63cb253f2965c\` FOREIGN KEY (\`ownerId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_b47807ec432524080fc20e0501c\` FOREIGN KEY (\`reportId\`) REFERENCES \`reports\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_ca9c53b38f30059b0c452f2136e\` FOREIGN KEY (\`followerId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_9d1f7644780fbd96bdc1946ee19\` FOREIGN KEY (\`likeInteractionId\`) REFERENCES \`like_interactions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_9faba56a12931cf4e38f9dddb49\` FOREIGN KEY (\`commentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`blog_media\` ADD CONSTRAINT \`FK_7c4f1f8db2b51dd47e49f0093a4\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`blogs\` ADD CONSTRAINT \`FK_998d6c1e3c685955774e5195f49\` FOREIGN KEY (\`ownerId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`like_interactions\` ADD CONSTRAINT \`FK_bc8540090e8c59857b771b1550a\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4875672591221a61ace66f2d4f9\` FOREIGN KEY (\`parentCommentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_bb2283b93a5414b9cfe834a181a\` FOREIGN KEY (\`movieId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_42a37ec3be9f871d4e44dd21bf9\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`follow_interactions\` ADD CONSTRAINT \`FK_83767cd14c042454b693c34d0a2\` FOREIGN KEY (\`userId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`movies_genres\` ADD CONSTRAINT \`FK_bc4c63354dccac2bea89b8fc783\` FOREIGN KEY (\`movieId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`movies_genres\` ADD CONSTRAINT \`FK_d7936095d9ff2718d896f9f943f\` FOREIGN KEY (\`genreId\`) REFERENCES \`genres\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`movies_casts\` ADD CONSTRAINT \`FK_593a2a928373acfa0974229c978\` FOREIGN KEY (\`movieId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`movies_casts\` ADD CONSTRAINT \`FK_3b7b2a0df647167c8458cc79f54\` FOREIGN KEY (\`castId\`) REFERENCES \`casts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`watchlists_movies\` ADD CONSTRAINT \`FK_cf4a88578acb5c0a36bd1d5e6ee\` FOREIGN KEY (\`watchlistId\`) REFERENCES \`watchlists\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`watchlists_movies\` ADD CONSTRAINT \`FK_5b5a4574e9ee9e1de3f090716a7\` FOREIGN KEY (\`movieId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`blogs_tags\` ADD CONSTRAINT \`FK_abe1f14bc72b0f16746a301adf3\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`blogs_tags\` ADD CONSTRAINT \`FK_f65ff2ea7ef79891b3277f1a3c2\` FOREIGN KEY (\`tagId\`) REFERENCES \`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`like_interactions_users\` ADD CONSTRAINT \`FK_25a7e961906ca420a43804d870d\` FOREIGN KEY (\`likeInteractionId\`) REFERENCES \`like_interactions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`like_interactions_users\` ADD CONSTRAINT \`FK_421d465265a2f653ea5a601e08b\` FOREIGN KEY (\`userId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`followers_interactions_users\` ADD CONSTRAINT \`FK_4a1fa7c1a2d3da538a05bdeede2\` FOREIGN KEY (\`followInteractionId\`) REFERENCES \`follow_interactions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`followers_interactions_users\` ADD CONSTRAINT \`FK_bffbb5fb067bf1bea82f73bb5a7\` FOREIGN KEY (\`userId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`following_interactions_users\` ADD CONSTRAINT \`FK_7dd683662c267d2550292005684\` FOREIGN KEY (\`followInteractionId\`) REFERENCES \`follow_interactions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
    await queryRunner.query(
      `ALTER TABLE \`following_interactions_users\` ADD CONSTRAINT \`FK_85eea8ad0dadc9ffda2c7b0320d\` FOREIGN KEY (\`userId\`) REFERENCES \`registeredUsers\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`following_interactions_users\` DROP FOREIGN KEY \`FK_85eea8ad0dadc9ffda2c7b0320d\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`following_interactions_users\` DROP FOREIGN KEY \`FK_7dd683662c267d2550292005684\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`followers_interactions_users\` DROP FOREIGN KEY \`FK_bffbb5fb067bf1bea82f73bb5a7\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`followers_interactions_users\` DROP FOREIGN KEY \`FK_4a1fa7c1a2d3da538a05bdeede2\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`like_interactions_users\` DROP FOREIGN KEY \`FK_421d465265a2f653ea5a601e08b\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`like_interactions_users\` DROP FOREIGN KEY \`FK_25a7e961906ca420a43804d870d\``,
    )
    await queryRunner.query(`ALTER TABLE \`blogs_tags\` DROP FOREIGN KEY \`FK_f65ff2ea7ef79891b3277f1a3c2\``)
    await queryRunner.query(`ALTER TABLE \`blogs_tags\` DROP FOREIGN KEY \`FK_abe1f14bc72b0f16746a301adf3\``)
    await queryRunner.query(`ALTER TABLE \`watchlists_movies\` DROP FOREIGN KEY \`FK_5b5a4574e9ee9e1de3f090716a7\``)
    await queryRunner.query(`ALTER TABLE \`watchlists_movies\` DROP FOREIGN KEY \`FK_cf4a88578acb5c0a36bd1d5e6ee\``)
    await queryRunner.query(`ALTER TABLE \`movies_casts\` DROP FOREIGN KEY \`FK_3b7b2a0df647167c8458cc79f54\``)
    await queryRunner.query(`ALTER TABLE \`movies_casts\` DROP FOREIGN KEY \`FK_593a2a928373acfa0974229c978\``)
    await queryRunner.query(`ALTER TABLE \`movies_genres\` DROP FOREIGN KEY \`FK_d7936095d9ff2718d896f9f943f\``)
    await queryRunner.query(`ALTER TABLE \`movies_genres\` DROP FOREIGN KEY \`FK_bc4c63354dccac2bea89b8fc783\``)
    await queryRunner.query(`ALTER TABLE \`follow_interactions\` DROP FOREIGN KEY \`FK_83767cd14c042454b693c34d0a2\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_42a37ec3be9f871d4e44dd21bf9\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_bb2283b93a5414b9cfe834a181a\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4875672591221a61ace66f2d4f9\``)
    await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``)
    await queryRunner.query(`ALTER TABLE \`like_interactions\` DROP FOREIGN KEY \`FK_bc8540090e8c59857b771b1550a\``)
    await queryRunner.query(`ALTER TABLE \`blogs\` DROP FOREIGN KEY \`FK_998d6c1e3c685955774e5195f49\``)
    await queryRunner.query(`ALTER TABLE \`blog_media\` DROP FOREIGN KEY \`FK_7c4f1f8db2b51dd47e49f0093a4\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_9faba56a12931cf4e38f9dddb49\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_9d1f7644780fbd96bdc1946ee19\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_ca9c53b38f30059b0c452f2136e\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_b47807ec432524080fc20e0501c\``)
    await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_59ca06b1bcf1ad63cb253f2965c\``)
    await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_585d50a9854c9a4b8605470c8d2\``)
    await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_1a7a328279e62111bebddfc2649\``)
    await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_4353be8309ce86650def2f8572d\``)
    await queryRunner.query(`ALTER TABLE \`watchlists\` DROP FOREIGN KEY \`FK_b2fef33469d6dab233474de2fb4\``)
    await queryRunner.query(`ALTER TABLE \`rates\` DROP FOREIGN KEY \`FK_9fc25664c414f181525e1e74a80\``)
    await queryRunner.query(`ALTER TABLE \`rates\` DROP FOREIGN KEY \`FK_cd296144bf64811ed81e3058af1\``)
    await queryRunner.query(`DROP INDEX \`IDX_85eea8ad0dadc9ffda2c7b0320\` ON \`following_interactions_users\``)
    await queryRunner.query(`DROP INDEX \`IDX_7dd683662c267d255029200568\` ON \`following_interactions_users\``)
    await queryRunner.query(`DROP TABLE \`following_interactions_users\``)
    await queryRunner.query(`DROP INDEX \`IDX_bffbb5fb067bf1bea82f73bb5a\` ON \`followers_interactions_users\``)
    await queryRunner.query(`DROP INDEX \`IDX_4a1fa7c1a2d3da538a05bdeede\` ON \`followers_interactions_users\``)
    await queryRunner.query(`DROP TABLE \`followers_interactions_users\``)
    await queryRunner.query(`DROP INDEX \`IDX_421d465265a2f653ea5a601e08\` ON \`like_interactions_users\``)
    await queryRunner.query(`DROP INDEX \`IDX_25a7e961906ca420a43804d870\` ON \`like_interactions_users\``)
    await queryRunner.query(`DROP TABLE \`like_interactions_users\``)
    await queryRunner.query(`DROP INDEX \`IDX_f65ff2ea7ef79891b3277f1a3c\` ON \`blogs_tags\``)
    await queryRunner.query(`DROP INDEX \`IDX_abe1f14bc72b0f16746a301adf\` ON \`blogs_tags\``)
    await queryRunner.query(`DROP TABLE \`blogs_tags\``)
    await queryRunner.query(`DROP INDEX \`IDX_5b5a4574e9ee9e1de3f090716a\` ON \`watchlists_movies\``)
    await queryRunner.query(`DROP INDEX \`IDX_cf4a88578acb5c0a36bd1d5e6e\` ON \`watchlists_movies\``)
    await queryRunner.query(`DROP TABLE \`watchlists_movies\``)
    await queryRunner.query(`DROP INDEX \`IDX_3b7b2a0df647167c8458cc79f5\` ON \`movies_casts\``)
    await queryRunner.query(`DROP INDEX \`IDX_593a2a928373acfa0974229c97\` ON \`movies_casts\``)
    await queryRunner.query(`DROP TABLE \`movies_casts\``)
    await queryRunner.query(`DROP INDEX \`IDX_d7936095d9ff2718d896f9f943\` ON \`movies_genres\``)
    await queryRunner.query(`DROP INDEX \`IDX_bc4c63354dccac2bea89b8fc78\` ON \`movies_genres\``)
    await queryRunner.query(`DROP TABLE \`movies_genres\``)
    await queryRunner.query(`DROP INDEX \`REL_83767cd14c042454b693c34d0a\` ON \`follow_interactions\``)
    await queryRunner.query(`DROP TABLE \`follow_interactions\``)
    await queryRunner.query(`DROP INDEX \`IDX_31c4b42dcb286e8ee825f0127f\` ON \`comments\``)
    await queryRunner.query(`DROP TABLE \`comments\``)
    await queryRunner.query(`DROP INDEX \`REL_bc8540090e8c59857b771b1550\` ON \`like_interactions\``)
    await queryRunner.query(`DROP TABLE \`like_interactions\``)
    await queryRunner.query(`DROP TABLE \`blogs\``)
    await queryRunner.query(`DROP TABLE \`blog_media\``)
    await queryRunner.query(`DROP INDEX \`IDX_aef1c7aef3725068e5540f8f00\` ON \`notifications\``)
    await queryRunner.query(`DROP INDEX \`REL_9d1f7644780fbd96bdc1946ee1\` ON \`notifications\``)
    await queryRunner.query(`DROP TABLE \`notifications\``)
    await queryRunner.query(`DROP INDEX \`IDX_d5e66723d29c6f38b2ba70542d\` ON \`reports\``)
    await queryRunner.query(`DROP TABLE \`reports\``)
    await queryRunner.query(`DROP TABLE \`watchlists\``)
    await queryRunner.query(`DROP INDEX \`IDX_b0913c3e6c6a67a3148a28ddb5\` ON \`rates\``)
    await queryRunner.query(`DROP TABLE \`rates\``)
    await queryRunner.query(`DROP TABLE \`movies\``)
    await queryRunner.query(`DROP TABLE \`casts\``)
    await queryRunner.query(`DROP TABLE \`genres\``)
    await queryRunner.query(`DROP INDEX \`IDX_ee0663a14e3852f4f4fa3f4e20\` ON \`registeredUsers\``)
    await queryRunner.query(`DROP INDEX \`IDX_e0cc9f59f1667bd74c96bbb809\` ON \`registeredUsers\``)
    await queryRunner.query(`DROP TABLE \`registeredUsers\``)
    await queryRunner.query(`DROP INDEX \`IDX_d90243459a697eadb8ad56e909\` ON \`tags\``)
    await queryRunner.query(`DROP TABLE \`tags\``)
  }
}
