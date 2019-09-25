import { Label } from 'semantic-ui-react';
import { Column, DefaultFilterFunction } from 'react-table';
import numeral from 'numeral';

import { TableHeader } from './components/header';
import { LicenseDropdown, FilterInput } from './components/filters';
import { LastActive, WebsiteLink, ToolIcon } from './components/cells';

/**
 * Custom Sorting Methods
 */
const sortNumbers = (a: string | number, b: string | number) => {
  a = numeral(a).value();
  b = numeral(b).value();
  // force null and undefined to the bottom
  a = a === null || a === undefined ? -Infinity : a;
  b = b === null || b === undefined ? -Infinity : b;
  // Return either 1 or -1 to indicate a sort priority
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

/**
 * Custom Filter Methods
 */
const filterName: DefaultFilterFunction = (filter, row) => row.name.toLowerCase().includes(filter.value.toLowerCase());
const filterSlogan: DefaultFilterFunction = (filter, row) => row['slogan.slogan'].toLowerCase().includes(filter.value.toLowerCase());
const filterSize: DefaultFilterFunction = (filter, row) => numeral(row['github-diskUsage']).value() <= parseInt(filter.value, 10);
const filterStars: DefaultFilterFunction = (filter, row) => numeral(row['github-stars']).value() >= parseInt(filter.value, 10);
const filterDownloads: DefaultFilterFunction = (filter, row) => numeral(row['npm-weekly-downloads']).value() >= parseInt(filter.value, 10);
const filterIssues: DefaultFilterFunction = (filter, row) => numeral(row['github-issues']).value() <= parseInt(filter.value, 10);
const filterLicence: DefaultFilterFunction = (filter, row) => filter.value === 'all'
  ? true
  : (
      filter.value === 'mit'
        ? row['github-license'].props.children === 'MIT'
        : row['github-license'].props.children === 'MIT' || row['github-license'].props.children === 'unknown'
  );

/**
 * Table Columns
 */
// tslint:disable: jsx-no-lambda
export const columns: Column[] = [
  {
    id: 'icon',
    accessor: d => <ToolIcon url={d.website} />,
    filterable: false,
    width: 36,
    sortable: false,
  },
  {
    Header: () => <TableHeader content="Name" icon="star" />,
    accessor: 'name',
    filterMethod: filterName,
    Filter: ({ filter = {}, onChange }) => <FilterInput label="includes:" onChange={event => onChange(event.target.value)} />,
    minWidth: 150,
  },
  {
    Header: () => <TableHeader content="Info" icon="star" />,
    accessor: 'slogan.slogan',
    filterMethod: filterSlogan,
    Filter: ({ filter = {}, onChange }) => <FilterInput label="includes:" width="90%" onChange={event => onChange(event.target.value)} />,
    minWidth: 250,
    sortable: false,
  },
  {
    id: 'github-diskUsage',
    Header: () => <TableHeader content="Size [kB]" icon="hdd outline" />,
    accessor: d => d.fields.githubData ? numeral(d.fields.githubData.repository.diskUsage).format('0,0') : <Label color={undefined}>unknown</Label>,
    filterMethod: filterSize,
    Filter: ({ filter = {}, onChange }) => <FilterInput label="max:" onChange={event => onChange(event.target.value)} />,
    sortMethod: sortNumbers,
  },
  {
    id: 'github-stars',
    Header: () => <TableHeader content="Stars" icon="star" />,
    accessor: d => d.fields.githubData ?  numeral(d.fields.githubData.repository.stargazers.totalCount).format('0,0') : <Label color={undefined}>unknown</Label>,
    filterMethod: filterStars,
    Filter: ({ filter = {}, onChange }) => <FilterInput label="min:" onChange={event => onChange(event.target.value)} />,
    sortMethod: sortNumbers,
  },
  {
    id: 'npm-weekly-downloads',
    Header: () => <TableHeader content="Downloads" icon="npm" />,
    accessor: d => d.fields.npmData ? numeral(d.fields.npmData.downloads).format('0,0') : <Label color={undefined}>unknown</Label>,
    filterMethod: filterDownloads,
    Filter: ({ filter = {}, onChange }) => <FilterInput label="min:" onChange={event => onChange(event.target.value)} />,
    sortMethod: sortNumbers,
  },
  {
    id: 'github-issues',
    Header: () => <TableHeader content="Issues" icon="exclamation circle" />,
    accessor: d => d.fields.githubData ? numeral(d.fields.githubData.repository.issues.totalCount).format('0,0') : <Label color={undefined}>unknown</Label>,
    filterMethod: filterIssues,
    Filter: ({ filter = {}, onChange }) => <FilterInput label="max:" onChange={event => onChange(event.target.value)} />,
    sortMethod: sortNumbers,
  },
  {
    id: 'github-license',
    Header: () => <TableHeader content="License" icon="copyright outline" />,
    // TODO: Move to separate file
    accessor: d => d.fields.githubData && d.fields.githubData.repository.licenseInfo
      ? <Label color={d.fields.githubData.repository.licenseInfo.spdxId === 'MIT' ? 'green' : 'orange'}>{d.fields.githubData.repository.licenseInfo.spdxId}</Label>
      : <Label color={undefined}>unknown</Label>,
    filterMethod: filterLicence,
    Filter: ({ filter = {}, onChange }) => <LicenseDropdown value={filter.value ? filter.value : 'all'} onChange={(event, data) => onChange(data.value)} />,
    sortable: false,
  },
  {
    id: 'github-lastActive',
    Header: () => <TableHeader content="Last active" icon="clock outline" />,
    accessor: LastActive,
    filterable: false,
    sortable: false,
  },
  {
    id: 'website',
    Header: () => <TableHeader content="URL" icon="globe" />,
    accessor: d => <WebsiteLink url={d.website} />,
    filterable: false,
    width: 80,
    sortable: false,
  },
];
