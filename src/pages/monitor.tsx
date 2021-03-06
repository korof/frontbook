import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components';
import { SEO } from '../components/helpers';
import { CardGroup } from '../components/NonTables';
import { categoriesNames, CategoryPageNoSubcategories } from '../shared';

const MonitorPage = ({ data }: CategoryPageNoSubcategories) => (
  <Layout pageType="category" category="monitor" color={categoriesNames.monitor.color}>
    <SEO title={categoriesNames.monitor.name} />
    <CardGroup items={data.items.edges} links={data.links.edges} />
  </Layout>
);

export const query = graphql`
  query monitorSubcategoriesQuery {
    items: allContentfulToolEntry(filter: { subcategory: { eq: "monitor_empty" } }) {
      edges {
        node {
          ...ToolsDataFragment
        }
      }
    }
    links: allContentfulLinksEntry(filter: { subcategory: { eq: "monitor_empt" } }) {
      edges {
        node {
          title
          url
        }
      }
    }
  }
`;

export default MonitorPage;
