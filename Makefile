lint:
	pnpm exec eslint-silverwind --color .

lint-fix:
	pnpm exec eslint-silverwind --color . --fix

test: lint
	node --trace-deprecation --throw-deprecation test.js

publish:
	git push -u --tags origin master
	pnpm publish --no-git-checks

deps:
	rm -rf node_modules
	pnpm install

update:
	pnpm exec updates -u
	$(MAKE) deps

patch: test
	pnpm exec versions -R -C patch
	$(MAKE) publish

minor: test
	pnpm exec versions -R -C minor
	$(MAKE) publish

major: test
	pnpm exec versions -R -C major
	$(MAKE) publish

.PHONY: lint lint-fix test publish deps update patch minor major
