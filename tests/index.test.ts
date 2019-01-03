import { convertToMergedFlameGraph } from "../src";
import fs = require("fs");
import path = require("path");

describe("convertToMergedFlameGraph", () => {
	it("default", () => {
		const fixtureFile = path.resolve(
			__dirname,
			"../fixtures/profile.cpuprofile"
		);
		const profile = JSON.parse(fs.readFileSync(fixtureFile, "utf-8"));
		expect(convertToMergedFlameGraph(profile)).toMatchSnapshot();
	});
});
