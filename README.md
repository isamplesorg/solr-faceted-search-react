# Solr faceted search client and react component pack 

Solr faceted search client and react component pack

[![Build Status](https://travis-ci.org/HuygensING/solr-faceted-search-react.svg?branch=master)](https://travis-ci.org/HuygensING/solr-faceted-search-react)

## webpack way
The original module is built by browserify which cannot used by create-my-app.
This version is build by webpack and could be use by create-my-app.

## Use this component in local development
As this is just a React component, you'll need to use another project to run it.  In that app's top-level you'll want to run this:

`npm link </path/to/solr-faceted-search-react>`

After you've done that, you should start the watch command in *this* project's directory, which will cause the host app to reload when there are changes to this project:

`npm run watch`

## Build simple create-my-app
```
npx create-react-app@latest my-app --use-npm
```

Install required module
```
npm install redux
```

Clone this version solr-faceted-search-react and link it to my-app
```
cd my-app

# if my-app and solr-faceted-search-react is under same folder, or if not, use the path to solr-faceted-search-react
npm link ../solr-faceted-search-react
```

Modify index.js under src and url to your solr select API.
```
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import {
	SolrFacetedSearch,
	SolrClient
} from "solr-faceted-search-react";

import solrReducer from "./solr-reducer";
import { createStore } from "redux"

// Create a store for the reducer.
const store = createStore(solrReducer);

// The search fields and filterable facets you want
const fields = [
	{label: "All text fields", field: "*", type: "text"},
	{label: "Source", field: "source", type: "list-facet", facetSort:"index"},
	{label: "Context", field: "hasContextCategory", type: "list-facet", facetSort:"count"},
	{label: "Material", field: "hasMaterialCategory", type: "list-facet", facetSort:"count"},
	{label: "Specimen", field: "hasSpecimenCategory", type: "list-facet", facetSort:"count"},
	{label: "Registrant", field: "registrant", type: "list-facet", facetSort:"count"},
];

// The sortable fields you want
const sortFields = [
	{label: "Name", field: "koppelnaam_s"},
	{label: "Date of birth", field: "birthDate_i"},
	{label: "Date of death", field: "deathDate_i"}
];


// Construct the solr client api class
const solrClient = 	new SolrClient({
	url: "http://localhost:8984/solr/isb_core_records/select",
	searchFields: fields,
	sortFields: sortFields,

	// Delegate change callback to redux dispatcher
	onChange: (state) => store.dispatch({type: "SET_SOLR_STATE", state: state})
});

// Register your app with the store
store.subscribe(() =>
	// In stead of using the handlers passed along in the onChange callback of SolrClient
	// use the .getHandlers() method to get the default click / change handlers
	ReactDOM.render(

		<SolrFacetedSearch
			{...store.getState()}
			{...solrClient.getHandlers()}
			bootstrapCss={true}
			onSelectDoc={(doc) => console.log(doc)}
		/>,
		document.getElementById("app")
	)
);

document.addEventListener("DOMContentLoaded", () => {
	// this will send an initial search initializing the app
	
	solrClient.initialize();
});
reportWebVitals();

```

Create a new file named "solr-reducer.js" under src
```
// src/solr-reducer.js
const initialState = {
	query: {},
	result: {}
}

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_SOLR_STATE":
			console.log("In reducer: ", action.state);
			return {...state, ...action.state}
	}
}
```

Modify index.html under public
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    <title>React App</title>
	<style type="text/css">
		a {
			cursor: pointer;
		}

		.list-facet ul {
			overflow-y: auto;
			max-height: 200px;
		}

		.list-facet ul li {
			cursor: pointer
		}

		.list-facet ul li:hover {
			text-decoration: underline;
		}

		.facet-range-slider {
			-moz-user-select: none;
			-webkit-user-select: none;
			-ms-user-select: none;
			user-select: none;
			-webkit-user-drag: none;
			user-drag: none;
			cursor: pointer;
			width: 100%;
			stroke: #f1ebe6;
			fill: #f1ebe6;
		}

		.facet-range-slider .range-line {
			stroke-width: 8;
		}

		.facet-range-slider .range-line circle {
			stroke-width: 0;
		}

		.facet-range-slider .range-line circle.hovering,
		.facet-range-slider .range-line circle:hover {
			fill: #bda47e;
		}

		.facet-range-slider .range-line path.hovering,
		.facet-range-slider .range-line path:hover {
			stroke: #bda47e;
		}

		.current-query label,
		.solr-search-results ul label {
			display: inline-block;
			margin: 0 20px 0 0;
			width: 120px;
			color: #666;
			overflow: hidden;
			white-space: nowrap;
			vertical-align: bottom;
			text-overflow: ellipsis
		}

		.solr-search-results ul li ul {
			list-style: none;
			padding: 0;
		}

		svg.search-icon {
			stroke: #595959;
			fill: #595959;
		}

		.current-query .label {
			display: inline-block;
			padding: 4px;
			cursor: pointer;
			margin-left: 4px;
		}

		.current-query .label:hover a {
			color: #d08989;
		}
		.current-query .label a {
			color: white;
			margin-left: 4px;
		}

		.range-facet header h5 {
			max-width: calc(100% - 75px)

		}

		.facet-item-amount {
			display:inline-block;
			float:right;
			color: #aaa;
		}

		.list-facet > .list-group {
			box-shadow: none;
		}
		.list-facet > .list-group > .list-group-item {
			border: none;
		}

		.list-facet > input {
			width: calc(100% - 125px)
		}
	</style>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="app"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```

# Start 
After you setup create-my-app, run it.
```
npm start
```
