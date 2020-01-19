const Dev = require('../models/Dev');
const parseStrArr = require('../utils/parseStringAsArrays');

module.exports =  {
    async index(request,response){
        // Buscar todos os devs num raio de 10km
        // Filtrar por tecnologias
        const { latitude, longitude, techs } = request.query;
        console.log(request.query);
        const techsArray = parseStrArr(techs);
        console.log(techsArray);

        const devs = await Dev.find({
            techs:{
                $in: techsArray
            },
            location:{
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs })
    }
}