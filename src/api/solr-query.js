const rangeFacetToQueryFilter = (field) => {
  const filters = field.value || [];
  if (filters.length < 2) {
    return null;
  }

  return encodeURIComponent(`${field.field}:[${filters[0]} TO ${filters[1]}]`);
};

const periodRangeFacetToQueryFilter = (field) => {
  const filters = field.value || [];
  if (filters.length < 2) {
    return null;
  }

  return encodeURIComponent(
    `${field.lowerBound}:[${filters[0]} TO ${filters[1]}] OR ` +
    `${field.upperBound}:[${filters[0]} TO ${filters[1]}] OR ` +
    `(${field.lowerBound}:[* TO ${filters[0]}] AND ${field.upperBound}:[${filters[1]} TO *])`
  );
};

const listFacetFieldToQueryFilter = (field) => {
  const filters = field.value || [];
  if (filters.length === 0) {
    return null;
  }

  const filterQ = filters.map((f) => `"${f}"`).join(" OR ");
  return encodeURIComponent(`${field.field}:(${filterQ})`);
};

const textFieldToQueryFilter = (field) => {
  if (!field.value || field.value.length === 0) {
    return null;
  }

  return encodeURIComponent(`${field.field}:${field.value}`);
};

// new function to generate spatial query
const spatialToQueryFilter = (field) => {
  if (!field.value || field.value.length === 0) {
    return null;
  }
  return encodeURIComponent(`${field.field}:[${field.value.min_lat},${field.value.min_lon} TO ${field.value.max_lat},${field.value.max_lon}]`)
}

const fieldToQueryFilter = (field) => {
  if ((field.type === "text" || field.type === "non-search" )&& field.field !== "*") {
    return textFieldToQueryFilter(field);
  } else if (field.type === "list-facet" || field.type === "hierarchy-facet") {
    return listFacetFieldToQueryFilter(field);
  } else if (field.type === "range-facet" || field.type === "range" || field.type === "date-range-facet") {
    return rangeFacetToQueryFilter(field);
  } else if (field.type === "period-range-facet" || field.type === "period-range") {
    return periodRangeFacetToQueryFilter(field);
  } else if (field.type === "spatialquery"){
    return spatialToQueryFilter(field);
  }
  return null;
};

const buildQuery = (fields, mainQueryField) => fields
// Do not include main query field in filter field query param.
  .filter((searchField) => (!Object.hasOwnProperty.call(searchField, "field") || (Object.hasOwnProperty.call(searchField, "field") && searchField.field !== mainQueryField)))
  .map(fieldToQueryFilter)
  .filter((queryFilter) => queryFilter !== null)
  .map((queryFilter) => `fq=${queryFilter}`)
  .join("&");

// return fq solr query param values 
const getFqQuery = (fields, mainQueryField) => fields
  .filter((searchField) => (!Object.hasOwnProperty.call(searchField, "field") || (Object.hasOwnProperty.call(searchField, "field") && searchField.field !== mainQueryField)))
  .map(fieldToQueryFilter)
  .filter((queryFilter) => queryFilter !== null);

// Concates all request fields for solr fl parameters
const requestField = (fields) => fields
  .map((field) => `${encodeURIComponent(field.field)}`)
  .join(" ");

const dateRangeFacetFieldValue = (dateRangeFacetField) => {
  var filters = dateRangeFacetField.value;
  if (!filters || filters.length === 0) {
    return "";
  }
  const dateSuffix = "-01-01T00:00:00Z";
  // startRange will be year-only, format in the way that makes solr happy
  let startRangeValue = filters[0] + dateSuffix;
  let endRangeValue = filters[1] + dateSuffix;
  return `facet.range=${encodeURIComponent(dateRangeFacetField.field)}&facet.range.gap=${encodeURIComponent("+1YEARS")}&facet.range.start=${startRangeValue}&facet.range.end=${endRangeValue}`;
};

const facetFields = (fields) => fields
  .filter((field) => field.type === "list-facet" || field.type === "range-facet" || field.type === "hierarchy-facet")
  .map((field) => `facet.field=${encodeURIComponent(field.field)}`)
  .concat(
    fields
      .filter((field) => field.type === "period-range-facet")
      .map((field) => `facet.field=${encodeURIComponent(field.lowerBound)}&facet.field=${encodeURIComponent(field.upperBound)}`)
  )
  .concat(
    fields
      .filter((field) => field.type === "date-range-facet")
      .map((field) =>
      dateRangeFacetFieldValue(field))
  )
  .join("&");

const facetSorts = (fields) => fields
  .filter((field) => field.facetSort)
  .map((field) => `f.${encodeURIComponent(field.field)}.facet.sort=${field.facetSort}`)
  .join("&");

const buildSort = (sortFields) => sortFields
  .filter((sortField) => sortField.value)
  .map((sortField) => encodeURIComponent(`${sortField.field} ${sortField.value}`))
  .join(",");

const buildFormat = (format) => Object.keys(format)
  .map((key) => `${key}=${encodeURIComponent(format[key])}`)
  .join("&");

const buildMainQuery = (fields, mainQueryField, isD7, proxyIsDisabled) => {
  // Use "search" as the main param for D7 proxy implementations.
  const mainParam = isD7 && !proxyIsDisabled ? "search" : "q";

  let params = fields.filter(function (searchField) {
    return searchField.field === mainQueryField;
  }).map(function (searchField) {
    return searchField.value;
  });
  // Add value of the mainQueryField to the q param, if there is one.
  if (params[0]) {
    return `${mainParam}=${params[0]}`;
  }

  // If query field exists but is null/empty/undefined send the wildcard query.
  return `${mainParam}=*:*`;
};

const getqQuery = (fields, mainQueryField, isD7, proxyIsDisabled) => {
  // return q solr query param values 
  const mainParam = isD7 && !proxyIsDisabled ? "search" : "q";
  if (mainParam === "q") {
    let params = fields.filter(function (searchField) {
      return searchField.field === mainQueryField;
    }).map(function (searchField) {
      return searchField.value;
    });
    // Add value of the mainQueryField to the q param, if there is one.
    if (params[0]) {
      return `${params[0]}`;
    }
  }

  // If query field exists but is null/empty/undefined send the wildcard query.
  return `*:*`;
};


const buildHighlight = (highlight) => {
  let hlQs = "";
  // If highlight is set, then populate params from keys/values.
  if (highlight !== null && typeof highlight === "object") {
    let hlParams = "hl=on";

    for (const key of Object.keys(highlight)) {
      // Support nested objects like hl.simple.tags
      if (typeof highlight[key] === "object") {
        for (const nestedKey of Object.keys(highlight[key])) {
          hlParams += `&hl.${key}.${nestedKey}=${encodeURIComponent(highlight[key][nestedKey])}`;
        }
      }
      // Support flat key/values like hl.fl=my_field_name
      else {
        hlParams += `&hl.${key}=${encodeURIComponent(highlight[key])}`;
      }
    }

    hlQs = hlParams;
  }
  return hlQs;
};

// get the q and fq solr query param values 
const getQFQSolrQueryParamValues = (query) => {
  const {
    searchFields,
    isD7,
    proxyIsDisabled
  } = query;
  const mainQueryField = Object.hasOwnProperty.call(query, "mainQueryField") ? query.mainQueryField : null;

  const filters = (query.filters || []).map((filter) => ({...filter, type: filter.type || "text"}));

  const fqQueryParams = getFqQuery(searchFields.concat(filters), mainQueryField);
  const qQueryParams = getqQuery(searchFields.concat(filters), mainQueryField, isD7, proxyIsDisabled);

  return {
    'q': decodeURIComponent(qQueryParams),
    'fq' :decodeURIComponent(fqQueryParams)
  };
} 

const solrQuery = (query, format = {wt: "json"}) => {
  const {
    searchFields,
    sortFields,
    rows,
    start,
    facetLimit,
    facetSort,
    pageStrategy,
    cursorMark,
    idField,
    group,
    hl,
    isD7,
    proxyIsDisabled
  } = query;

  const mainQueryField = Object.hasOwnProperty.call(query, "mainQueryField") ? query.mainQueryField : null;

  const filters = (query.filters || []).map((filter) => ({...filter, type: filter.type || "text"}));
  const mainQuery = buildMainQuery(searchFields.concat(filters), mainQueryField, isD7, proxyIsDisabled);
  const queryParams = buildQuery(searchFields.concat(filters), mainQueryField);

  const facetedReturnParam = requestField(searchFields);
  const facetFieldParam = facetFields(searchFields);
  const facetSortParams = facetSorts(searchFields);
  const facetLimitParam = `facet.limit=${facetLimit || -1}`;
  const facetSortParam = `facet.sort=${facetSort || "index"}`;

  const cursorMarkParam = pageStrategy === "cursor" ? `cursorMark=${encodeURIComponent(cursorMark || "*")}` : "";
  const idSort = pageStrategy === "cursor" ? [{field: idField, value: "asc"}] : [];

  const sortParam = buildSort(sortFields.concat(idSort));
  const groupParam = group && group.field ? `group=on&group.field=${encodeURIComponent(group.field)}` : "";
  const highlightParam = buildHighlight(hl);

  return mainQuery +
    `${facetedReturnParam.length > 0 ? `&fl=${facetedReturnParam}` : ""}` +
    `${queryParams.length > 0 ? `&${queryParams}` : ""}` +
    `${sortParam.length > 0 ? `&sort=${sortParam}` : ""}` +
    `${facetFieldParam.length > 0 ? `&${facetFieldParam}` : ""}` +
    `${facetSortParams.length > 0 ? `&${facetSortParams}` : ""}` +
    `${groupParam.length > 0 ? `&${groupParam}` : ""}` +
    `&rows=${rows}` +
    `&${facetLimitParam}` +
    `&${facetSortParam}` +
    `&${cursorMarkParam}` +
    (start === null ? "" : `&start=${start}`) +
    "&facet=on" +
    (highlightParam === "" ? "" : `&${highlightParam}`) +
    `&${buildFormat(format)}`;
};

export default solrQuery;

const buildSuggestQuery = (fields, mainQueryField, appendWildcard, isProxyDisabled, isD7) => {
  // Use "search" as the main param for D7 proxy implementations.
  let qs = isD7 && !isProxyDisabled ? "search=" : "q=";
  let params = fields.filter(function (searchField) {
    return searchField.field === mainQueryField;
  }).map(function (searchField) {
    // Remove spaces on either end of the value.
    const trimmed = searchField.value.trim();
    // One method of supporting search-as-you-type is to append a wildcard '*'
    //   to match zero or more additional characters at the end of the users search term.
    // @see: https://lucene.apache.org/solr/guide/6_6/the-standard-query-parser.html#TheStandardQueryParser-WildcardSearches
    // @see: https://opensourceconnections.com/blog/2013/06/07/search-as-you-type-with-solr/
    if (appendWildcard && trimmed.length > 0) {
      if (isProxyDisabled) {
        // Split into word chunks.
        const words = trimmed.split(" ");
        // If there are multiple chunks, join them with "+", repeat the last word + append "*".
        if (words.length > 1) {
          return `${words.join("+")}+${words.pop()}*`;
        }
        // If there is only 1 word, repeat it an append "*".
        return `${words}+${words}*`;
      }
      else {
        return `${trimmed}*`;
      }
    }
    // If we are not supposed to append a wildcard, just return the value.
    // ngram tokens/filters should be set up in solr config for
    // the autocomplete endpoint request handler.
    return trimmed;
  });

  if (params[0]) {
    qs += params[0];
  }

  return qs;
};

const solrSuggestQuery = (suggestQuery, format = {wt: "json"}) => {
  const {
    rows,
    searchFields,
    filters,
    appendWildcard,
    proxyIsDisabled,
    isD7
  } = suggestQuery;

  const mainQueryField = Object.hasOwnProperty.call(suggestQuery, "mainQueryField") ? suggestQuery.mainQueryField : null;

  const queryFilters = (filters || []).map((filter) => ({...filter, type: filter.type || "text"}));
  const mainQuery = buildSuggestQuery(searchFields.concat(queryFilters), mainQueryField, appendWildcard, proxyIsDisabled, isD7);
  const queryParams = buildQuery(searchFields.concat(queryFilters), mainQueryField);
  const facetFieldParam = facetFields(searchFields);
  const facetedReturnParam = requestField(searchFields);

  return mainQuery +
    `${facetedReturnParam.length > 0 ? `&fl=${facetedReturnParam}` : ""}` +
    `${queryParams.length > 0 ? `&${queryParams}` : ""}` +
    `${facetFieldParam.length > 0 ? `&${facetFieldParam}` : ""}` +
    `&rows=${rows}` +
    `&${buildFormat(format)}`;
};

export {
  rangeFacetToQueryFilter,
  periodRangeFacetToQueryFilter,
  listFacetFieldToQueryFilter,
  textFieldToQueryFilter,
  fieldToQueryFilter,
  buildQuery,
  buildMainQuery,
  buildSuggestQuery,
  buildHighlight,
  buildFormat,
  facetFields,
  facetSorts,
  requestField,
  buildSort,
  solrQuery,
  solrSuggestQuery,
  getQFQSolrQueryParamValues
};
