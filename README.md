# yaodingyd.github.io

[![travis](https://api.travis-ci.org/yaodingyd/yaodingyd.github.io.svg?branch=source)](https://api.travis-ci.org/yaodingyd/yaodingyd.github.io.svg?branch=source)


### Note
1. Initially there is a _js folder that would use ES6 so I need transpiler because jekyll can't build it. So I remove _sass and _js folder together from jekyll build (in `_config.yml` -> `exclude`). Under this condition I need to do gulp build everything I push to Github. Now I don't have js file so _sass folder is included again in jekyll build