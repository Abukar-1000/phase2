
interface IPage {
    name: string,
    route: string
}

type Pages = IPage[];

const pageOptions = ['ALL', 'Upload', 'Update', 'Search', 'Documentation'];

const pages: Pages = pageOptions.map(option => ({
    name: option,
    route: "/" + option.toLowerCase()
}));

export default pages;