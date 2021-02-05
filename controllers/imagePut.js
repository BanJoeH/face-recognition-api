import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: 'eb58449b870a4b96acc0ed2d956ae7ca'
   });

export const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}


export const handleImagePut = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        }) 
        .catch(err => res.status(400).json('Unable to get entries'))
  
}

