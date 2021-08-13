module.exports = {
	branches: ['master'],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'angular',
				releaseRules: [
					{ type: 'build(deps-dev)', release: 'patch' },
					{ type: 'refactor', release: 'patch' },
					{ type: 'fix', release: 'patch' },
					{ type: 'perf', release: 'patch' },
					{ type: 'feat', release: 'minor' },
				],
				parserOpts: { noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'] },
			},
		],
		'@semantic-release/release-notes-generator',
		'@semantic-release/npm',
	],
}
