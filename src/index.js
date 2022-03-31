import SolrFacetedSearch from "./components/solr-faceted-search";
import defaultComponentPack from "./components/component-pack";
import {SolrClient} from "./api/solr-client";
import * as solr_query from "./api/solr-query";

export default SolrFacetedSearch;

export {
  SolrFacetedSearch,
  defaultComponentPack,
  SolrClient,
  solr_query
};
