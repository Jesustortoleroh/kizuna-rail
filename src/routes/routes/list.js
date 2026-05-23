import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    // I changed const routes = await getAllRoutes(); to let so the routes could be updated.
    let routes = await getAllRoutes();
    const seasons = await getListOfSeasons();

    const {region, season} = req.query

    if (region) {
        routes = routes.filter(route => route.region === region);
    }

    if (season) {
        routes = routes.filter(routes => routes.bestSeason === season);
    }

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons
    });
};