export interface ListWithFilters<I, F> {
  items: I[];
  filters: F;
  paging: {
    offset: number;
    limit: number;
  };
}
