#!/bin/sh

node_modules/.bin/watchify src/index.js \
	--outfile 'node_modules/.bin/derequire > build/index.js' \
	--external react \
	--external react-dom \
	--standalone SolrFacetedSearch \
	--transform [ babelify --presets [ @babel/preset-env @babel/preset-react es2015 ] --plugins [ @babel/plugin-transform-destructuring @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-object-assign] ] \m-destructuring @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-object-assign] ] \
	--verbose
