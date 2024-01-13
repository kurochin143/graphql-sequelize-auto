import { loadEnvs } from "load-envs";

export interface TestEnv {
	TEST_SHOULD_REMOVE: number;
}

let testEnv: TestEnv | undefined;

const init = () => {
	if (testEnv) return;

	testEnv = loadEnvs<TestEnv>([
		{
			envKey: "TEST_SHOULD_REMOVE",
			options: {
				isNumber: true,
				defaultValue: 1,
			},
		},
	]);
};

init();

export default testEnv!;
