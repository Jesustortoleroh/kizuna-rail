import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    // I changed const routes = await getAllRoutes(); to let so the routes could be updated.
    let routes = await getAllRoutes();
    const seasons = await getListOfSeasons();

   const { region, season } = req.query;
if (region && region !== 'all') {
    routes = routes.filter(r =>
      r.region.toLowerCase() === region.toLowerCase()
    );
  }

  if (season && season !== 'all') {
    routes = routes.filter(r =>
      r.bestSeason.toLowerCase() === season.toLowerCase()
    );
  }

  

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query: req.query
    });
    
};