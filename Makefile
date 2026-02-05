test:
	pnpm exec eslint --color .
	node --trace-deprecation --throw-deprecation test.js

publish:
	git push -u --tags origin master
	pnpm publish

deps:
	rm -rf node_modules
	pnpm install

update:
	pnpm exec updates -u
	$(MAKE) deps

patch: test
	pnpm exec versions -C patch
	$(MAKE) publish

minor: test
	pnpm exec versions -C minor
	$(MAKE) publish

major: test
	pnpm exec versions -C major
	$(MAKE) publish

.PHONY: test publish deps update patch minor major
