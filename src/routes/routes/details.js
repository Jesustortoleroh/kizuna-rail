import { getCompleteRouteDetails } from '../../models/model.js';

export default async (req, res) => {
    try {
        const { routeId } = req.params;

       // Fetch the complete route details using the model function
        const details = await getCompleteRouteDetails(routeId);

        // If no details are found, render a 404 page 
        if (!details) {
            return res.status(404).render('errors/404', {
                title: 'Route Not Found',
                error: 'The requested train route does not exist.'
            });
        }

        // Render the route details page
        res.render('routes/details', { 
            title: 'Route Details',
            details
        });

    } catch (error) {
        console.error("Error fetching complete route details:", error);
        res.status(500).send('Internal Server Error');
    }
};