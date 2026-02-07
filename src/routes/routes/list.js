import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const { region: regionFilter, season: seasonFilter } = req.query;
    const regions = await getListOfRegions();
    let routes = await getAllRoutes();
    const seasons = await getListOfSeasons();
 
    // Apply filters if they exist
    if (regionFilter && regionFilter !== 'all') {
        routes = routes.filter(r => r.region.toLowerCase() === regionFilter.toLowerCase());
    }
    if (seasonFilter && seasonFilter !== 'all') {
        routes = routes.filter(r => r.bestSeason.toLowerCase() === seasonFilter.toLowerCase());
    }


   // Render the list page with the filtered routes and available regions/seasons for filtering
res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query: { region: regionFilter || 'all', season: seasonFilter || 'all' }
    });
};
