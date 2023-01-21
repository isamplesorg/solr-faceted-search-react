import Result from "./results/result";
import TextSearch from "./text-search";
import ListFacet from "./list-facet";
import ResultHeader from "./results/header";
import ResultList from "./results/list";
import ResultPending from "./results/pending";
import ResultContainer from "./results/container";
import ResultPagination from "./results/pagination";
import PreloadIndicator from "./results/preload-indicator";
import CsvExport from "./results/csv-export";
import SearchFieldContainer from "./search-field-container";
import { RangeFacet, RangeSlider } from "./range-facet";
// iSamples Spatial Query
import SpatialQuery from "./spatial-query";

import CountLabel from "./results/count-label";
import SortMenu from "./sort-menu";
import CurrentQuery from "./current-query";
import HierarchyFacet from "./hierarchy-facet";

export default {
  searchFields: {
    text: TextSearch,
    "list-facet": ListFacet,
	"hierarchy-facet": HierarchyFacet,
    "range-facet": RangeFacet,
    "period-range-facet": RangeFacet,
    "date-range-facet": RangeFacet,
    "non-search": TextSearch,
    container: SearchFieldContainer,
    currentQuery: CurrentQuery,
    rangeSlider: RangeSlider,
    spatialquery: SpatialQuery,
  },
  results: {
    result: Result,
    resultCount: CountLabel,
    header: ResultHeader,
    list: ResultList,
    container: ResultContainer,
    pending: ResultPending,
    preloadIndicator: PreloadIndicator,
    csvExport: CsvExport,
    paginate: ResultPagination
  },
  sortFields: {
    menu: SortMenu
  }
};
