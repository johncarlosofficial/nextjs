exports.up = (pgm) => {
    // Enable the 'uuid-ossp' extension for UUID generation, if not already enabled
    pgm.sql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // Create the 'users' table
    pgm.createTable("users", {
        id: {
            type: "uuid",
            notNull: true,
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()"),
        },
        name: { type: "varchar(255)", notNull: false },
        email: { type: "varchar(255)", unique: true, notNull: false },
        email_verified: { type: "timestamp", notNull: false },
        image: { type: "varchar(255)", notNull: false },
        password: { type: "varchar(255)", notNull: false },
    });

    // Create the 'accounts' table
    pgm.createTable("accounts", {
        id: {
            type: "uuid",
            notNull: true,
            primaryKey: true,
            default: pgm.func("uuid_generate_v4()"),
        },
        user_id: {
            type: "uuid",
            notNull: true,
            references: '"users"',
            onDelete: "CASCADE",
        },
        type: { type: "varchar(50)", notNull: true },
        provider: { type: "varchar(50)", notNull: true },
        provider_account_id: { type: "varchar(255)", notNull: true },
        refresh_token: { type: "text", notNull: false },
        access_token: { type: "text", notNull: false },
        expires_at: { type: "integer", notNull: false },
        token_type: { type: "varchar(50)", notNull: false },
        scope: { type: "varchar(255)", notNull: false },
        id_token: { type: "text", notNull: false },
        session_state: { type: "varchar(255)", notNull: false },
    });

    // Add unique constraint to 'email' in 'users' table
    pgm.addConstraint("users", "unique_email", {
        unique: ["email"],
    });

    // Add unique constraint on 'provider' and 'provider_account_id' in 'accounts' table
    pgm.addConstraint("accounts", "unique_provider_provider_account_id", {
        unique: ["provider", "provider_account_id"],
    });

    // Add foreign key constraint for 'user_id' in 'accounts' table referencing 'users' table
    pgm.addConstraint("accounts", "fk_accounts_user_id_users", {
        foreignKeys: {
            columns: "user_id",
            references: "users(id)",
            onDelete: "CASCADE",
        },
    });

    // Create index for 'user_id' in 'accounts' table to optimize queries
    pgm.createIndex("accounts", "user_id");
};
