export interface Data {
  website: any;
  websiteSettings: any;
  collection: any;
  shoppingCart: any;
  shareButtons: any;
  showCart: boolean;
  localizedStrings: any;
  userAccountsContext: any;
  template: any;
  uiextensions: any;
  empty: boolean;
  emptyFolter: boolean;
  calendarView: boolean;
  pagination: Pagination;
  items: DataItem[];
}

export interface Pagination {
  nextPage: boolean;
  nextPageOffset: number;
  nextPageUrl: string;
  pageSize: number;
}

export interface DataItem {
  id: string;
  collectionId: string;
  recordType:  number;
  addedOn: Date;
  updatedOn: Date;
  starred: boolean;
  passthrough: boolean;
  tags: string[];
  categories: string[];
  workflowState: string;
  urlId: string;
  title: string;
  body: string;
  assetUrl: string;
  fullUrl: string;
  excerpt: string;
}

export interface Item {
  id: string;
  urlId: string;
  title: string;
  description: string;
  when: string;
  where: string;
  forWho: string;
  type?: string;
  time?: string;
  tent?: string;
  childFriendly: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  favorite: boolean;
}
