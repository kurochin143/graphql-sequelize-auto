"use strict";

const sql = (strArr) => strArr[0];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.sequelize.query(
				sql`

-- users
CREATE TABLE public.users
(
	id SERIAL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by INT,
	updated_at TIMESTAMP,
	updated_by INT,
	deleted_at TIMESTAMP,
	deleted_by INT,
	username VARCHAR(255) NOT NULL,
	password CHAR(60) NOT NULL,
	first_name VARCHAR(255),
	last_name VARCHAR(255),

	CONSTRAINT pk__users PRIMARY KEY (id),

	CONSTRAINT fk__users__created_by FOREIGN KEY (created_by) REFERENCES public.users(id),
	CONSTRAINT fk__users__updated_by FOREIGN KEY (updated_by) REFERENCES public.users(id),
	CONSTRAINT fk__users__deleted_by FOREIGN KEY (deleted_by) REFERENCES public.users(id),

	CONSTRAINT uc__users__username UNIQUE (username)
);

CREATE INDEX idx__users__username ON public.users(username);
CREATE INDEX idx__users__username__first_name__last_name ON public.users(username, first_name, last_name);

CREATE TRIGGER trg_set_updated_at
	BEFORE UPDATE
	ON public.users
	FOR EACH ROW
	EXECUTE PROCEDURE public.fn_trg_set_updated_at();

-- permissions
CREATE TABLE public.permissions
(
	id SERIAL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by INT,
	updated_at TIMESTAMP,
	updated_by INT,
	deleted_at TIMESTAMP,
	deleted_by INT,
	code VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	description TEXT,

	CONSTRAINT pk__permissions PRIMARY KEY (id),

	CONSTRAINT fk__permissions__created_by FOREIGN KEY (created_by) REFERENCES public.users(id),
	CONSTRAINT fk__permissions__updated_by FOREIGN KEY (updated_by) REFERENCES public.users(id),
	CONSTRAINT fk__permissions__deleted_by FOREIGN KEY (deleted_by) REFERENCES public.users(id),

	CONSTRAINT uc__permissions__code UNIQUE (code),

	-- lowercase, alphanumeric and underscore only for code
	CONSTRAINT ck__permissions__code__char CHECK (code ~ '^[a-z0-9_]+$')
);

CREATE TRIGGER trg_set_updated_at
	BEFORE UPDATE
	ON public.permissions
	FOR EACH ROW
	EXECUTE PROCEDURE public.fn_trg_set_updated_at();

-- roles
CREATE TABLE public.roles
(
	id SERIAL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by INT,
	updated_at TIMESTAMP,
	updated_by INT,
	deleted_at TIMESTAMP,
	deleted_by INT,
	code VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	is_hard_coded BOOLEAN NOT NULL,
	description TEXT,

	CONSTRAINT pk__roles PRIMARY KEY (id),

	CONSTRAINT fk__roles__created_by FOREIGN KEY (created_by) REFERENCES public.users(id),
	CONSTRAINT fk__roles__updated_by FOREIGN KEY (updated_by) REFERENCES public.users(id),
	CONSTRAINT fk__roles__deleted_by FOREIGN KEY (deleted_by) REFERENCES public.users(id),

	CONSTRAINT uc__roles__code UNIQUE (code),

	-- lowercase, alphanumeric and underscore only for code
	CONSTRAINT ck__roles__code__char CHECK (code ~ '^[a-z0-9_]+$')
);

CREATE TRIGGER trg_set_updated_at
	BEFORE UPDATE
	ON public.roles
	FOR EACH ROW
	EXECUTE PROCEDURE public.fn_trg_set_updated_at();

-- role_permissions
CREATE TABLE public.role_permissions
(
	id SERIAL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by INT,
	updated_at TIMESTAMP,
	updated_by INT,
	deleted_at TIMESTAMP,
	deleted_by INT,
	role_id INT NOT NULL,
	permission_id INT NOT NULL,

	CONSTRAINT pk__role_permissions PRIMARY KEY (id),

	CONSTRAINT fk__rp__created_by FOREIGN KEY (created_by) REFERENCES public.users(id),
	CONSTRAINT fk__rp__updated_by FOREIGN KEY (updated_by) REFERENCES public.users(id),
	CONSTRAINT fk__rp__deleted_by FOREIGN KEY (deleted_by) REFERENCES public.users(id),
	CONSTRAINT fk__rp__role_id FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE,
	CONSTRAINT fk__rp__permission_id FOREIGN KEY (permission_id) REFERENCES public.permissions(id),

	CONSTRAINT uc__rp__role_id__permission_id UNIQUE (role_id, permission_id)
);

CREATE INDEX idx__rp__role_id__permission_id ON public.role_permissions(role_id, permission_id);

CREATE TRIGGER trg_set_updated_at
	BEFORE UPDATE
	ON public.role_permissions
	FOR EACH ROW
	EXECUTE PROCEDURE public.fn_trg_set_updated_at();

-- user_roles
CREATE TABLE public.user_roles
(
	id SERIAL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by INT,
	updated_at TIMESTAMP,
	updated_by INT,
	deleted_at TIMESTAMP,
	deleted_by INT,
	user_id INT NOT NULL,
	role_id INT NOT NULL,

	CONSTRAINT pk__user_roles PRIMARY KEY (id),

	CONSTRAINT fk__user_roles__created_by FOREIGN KEY (created_by) REFERENCES public.users(id),
	CONSTRAINT fk__user_roles__updated_by FOREIGN KEY (updated_by) REFERENCES public.users(id),
	CONSTRAINT fk__user_roles__deleted_by FOREIGN KEY (deleted_by) REFERENCES public.users(id),
	CONSTRAINT fk__user_roles__user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
	CONSTRAINT fk__user_roles__role_id FOREIGN KEY (role_id) REFERENCES public.roles(id),

	CONSTRAINT uc__user_roles__user_id__role_id UNIQUE (user_id, role_id)
);

CREATE INDEX idx__user_roles__user_id__role_id ON public.user_roles(user_id, role_id);

CREATE TRIGGER trg_set_updated_at
	BEFORE UPDATE
	ON public.user_roles
	FOR EACH ROW
	EXECUTE PROCEDURE public.fn_trg_set_updated_at();

-- roles and permissions
INSERT INTO public.roles(code, name, is_hard_coded)
VALUES('admin', 'Admin', true);

CREATE FUNCTION public.fn_trg_insert_new_permission_to_admin_role()
RETURNS TRIGGER AS $$
BEGIN
	INSERT INTO public.role_permissions(role_id, permission_id)
	VALUES((SELECT id FROM roles WHERE code = 'admin'), NEW.id);

	RETURN NEW;
END;
$$ LANGUAGE plpgsql volatile;

CREATE TRIGGER trg_insert_new_permission_to_admin_role
	AFTER INSERT
	ON public.permissions
	FOR EACH ROW
	EXECUTE PROCEDURE public.fn_trg_insert_new_permission_to_admin_role();

CREATE FUNCTION public.fn_trg_delete_permission_from_admin_role()
RETURNS TRIGGER AS $$
BEGIN
	DELETE FROM public.role_permissions
	WHERE role_id = (SELECT id FROM roles WHERE code = 'admin')
	AND permission_id = OLD.id;

	RETURN OLD;
END;
$$ LANGUAGE plpgsql volatile;

CREATE TRIGGER trg_delete_permission_from_admin_role
	BEFORE DELETE
	ON public.permissions
	FOR EACH ROW
	EXECUTE PROCEDURE public.fn_trg_delete_permission_from_admin_role();

			`,
				{ transaction: t },
			);
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.sequelize.query(
				sql`

DROP TRIGGER trg_delete_permission_from_admin_role ON public.permissions;
DROP FUNCTION public.fn_trg_delete_permission_from_admin_role;

DROP TRIGGER trg_insert_new_permission_to_admin_role ON public.permissions;
DROP FUNCTION public.fn_trg_insert_new_permission_to_admin_role;

DROP TABLE public.user_roles;
DROP TABLE public.role_permissions;
DROP TABLE public.roles;
DROP TABLE public.permissions;
DROP TABLE public.users;

				`,
				{ transaction: t },
			);
		});
	},
};
