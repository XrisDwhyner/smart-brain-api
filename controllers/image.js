const Clarifai =  require('clarifai');

//You must add your own API key here from clarifai
const app = new Clarifai.App({
    apiKey: '919f7084fc9545cc8e41431415980884'
   });
  
const handleApiCall =(req, res) => {
    app.models
   .predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
   .then(data =>{
       res.json(data);
   })
   .catch(err => res.status(400).json('Unable to fetch API'))
}
   
const handleImage = (req, res, db)=>{
    const {id} = req.body;
    db('user').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get count'))

}

module.exports = {
    handleImage,
    handleApiCall 
};

