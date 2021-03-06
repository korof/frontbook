export type CategoriesCodes = 'js' | 'jam' | 'css' | 'seo' | 'ide' | 'frontops' | 'monitor' | 'ux' | 'utils';
export type Subcategory =
  | 'js_animations'
  | 'js_security'
  | 'js_cheatsheets'
  | 'js_css-in-js'
  | 'js_data-visualization'
  | 'js_data-layer'
  | 'js_extensions'
  | 'js_frameworks'
  | 'js_graphic'
  | 'js_interactions'
  | 'js_search'
  | 'js_tests'
  | 'js_translations'
  | 'js_ui'
  | 'js_utils'
  | 'jam_cms'
  | 'jam_hosting'
  | 'jam_media'
  | 'jam_ssg'
  | 'css_animations'
  | 'css_cheatsheets'
  | 'css_frameworks'
  | 'css_processors'
  | 'css_utils'
  | 'ux_colors'
  | 'ux_design'
  | 'ux_fonts'
  | 'ux_graphics'
  | 'ux_icons'
  | 'ux_inspirations'
  | 'ux_logos';

export interface ListItem {
  name: string;
  subcategory: string;
  slogan: {
    slogan: string;
  };
  github?: string;
  npm?: string;
  website?: string;
  fields: {
    githubData?: {
      stars?: number;
      repository: {
        name: string;
        description?: string;
        diskUsage: number;
        issues: {
          totalCount: number;
        };
        stargazers: {
          totalCount: number;
        };
        licenseInfo: {
          spdxId?: string;
          url?: string;
        };
        pushedAt: Date;
      };
    };
    npmData?: {
      downloads: number;
    };
    bundlephobiaData?: {
      size: number;
      gzip: number;
      dependencyCount: number;
    };
  };
}

export interface SubcategoryNode {
  node: ListItem;
}

export interface LinkEntry {
  node: {
    title: string;
    url: string;
  };
}

export interface SubcategoryProps {
  data: {
    subcategory: {
      edges: SubcategoryNode[];
    };
    subcategories: {
      distinct: string[];
    };
    links: {
      edges: LinkEntry[];
    };
  };
  pageContext: {
    subcategory: string;
  };
}

export interface CategoryPageNoSubcategories {
  data: {
    items: {
      edges: SubcategoryNode[];
    };
    links: {
      edges: LinkEntry[];
    };
  };
}

export interface CategoryPage {
  data: {
    allContentfulToolEntry: {
      distinct: string[];
    };
  };
}
