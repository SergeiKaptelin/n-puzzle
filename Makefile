NAME = npuzzle

all: $(NAME)

$(NAME):
	npm i && npx eslint -c .eslintrc.json ./src/ && npx babel ./src --source-maps-inline -d ./dist --presets=es2015,stage-0
	echo '#!/bin/sh' > ./npuzzle
	echo 'node ./dist/app.js "$$@"' >> ./npuzzle
	chmod +x ./npuzzle

clean:
	rm -rf node_modules dist

fclean: clean
	rm -f npuzzle

re: fclean all

.PHONY: all clean fclean re