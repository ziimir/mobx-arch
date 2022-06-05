src_dir := src
dist_dir := out

webpack_config := --config webpack.js

.PHONY: clean
clean:
	rm -rf $(dist_dir)

#--------------------------------
# release targets
#--------------------------------

.PHONY: build
build: clean verify-ts
	NODE_ENV=production npx webpack $(webpack_config)

#--------------------------------
# dev targets
#--------------------------------

.PHONY: dev
dev: clean
	@# создаем server.js чтобы nodemon мог запуститься
	@mkdir -p $(dist_dir)
	@touch $(dist_dir)/server.js
	npx concurrently --kill-others --raw \
		"npx webpack --watch $(webpack_config)" \
		"npx nodemon --config nodemon.config.json $(dist_dir)/server.js"

.PHONY: debug
debug: clean
	@# создаем server.js чтобы nodemon мог запуститься
	@mkdir -p $(dist_dir)
	@touch $(dist_dir)/server.js
	npx concurrently --kill-others --raw \
		"npx webpack --watch $(webpack_config)" \
		"npx nodemon --inspect --config nodemon.config.json $(dist_dir)/server.js"

#--------------------------------
# validation targets
#--------------------------------

.PHONY: verify-ts
verify-ts:
	npx tsc --noEmit

.PHONY: lint-code
lint-code:
	npx eslint $(src_dir) --ext .ts,.tsx,js,jsx

.PHONY: unit-test
unit-test:
	npx jest --config jest.config.js

.PHONY: validate
validate: verify-ts lint-code unit-test
