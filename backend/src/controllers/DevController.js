const axios = require('axios');
const Dev = require('../models/Dev');
const parseStrArr = require('../utils/parseStringAsArrays');

module.exports={
    async destroy(request, response){
       const {devId =-1} = request.query;
       console.log(devId);
       const deleteResponse = await Dev.deleteOne({
            _id: devId
       }, (err) => {
        if (err) console.log(err);
       });

       response.json(deleteResponse.data);
    },
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        console.log(request.body);
        const { github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({github_username});

        if(!dev){
            const _response = await axios.get(`https://api.github.com/users/${github_username}`);    
            const {name = login, avatar_url, bio} = _response.data;
            const techsAr = parseStrArr(techs)
            const location = {
                type: 'Point',
                coordinates:[longitude,latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsAr,
                location
            })
        }
     
        response.json(dev);
    }

    // async update

    // async destroy
}