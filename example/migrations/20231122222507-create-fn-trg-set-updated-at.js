"use strict";

const sql = (strArr) => strArr[0];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.sequelize.query(
				sql`

CREATE FUNCTION public.fn_trg_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
	IF TG_OP = 'UPDATE' THEN
		NEW.updated_at = NOW();
	END IF;

	RETURN NEW;
END;
$$ LANGUAGE plpgsql volatile;

			`,
				{ transaction: t },
			);
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.sequelize.transaction(async (t) => {
			await queryInterface.sequelize.query(
				sql`

DROP FUNCTION public.fn_trg_set_updated_at;

				`,
				{ transaction: t },
			);
		});
	},
};
