const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv')
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');



dotenv.config();




const configuration = new Configuration({
    organization: "org-P3aQiSJ5zYmczJ5LbBRDgTsL",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/models', async (req, res) => {
  try {
    const response = await openai.listEngines();

   // console.log(response.data.data);

    res.json({
      models: response.data.data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

 app.post('/', async (req, res) => {
 
     const { message, currentModel } = req.body;
 
     const response = await openai.createCompletion({
       model: `${currentModel}`, //"text-davinci-003",
       prompt: `${message}`,
       max_tokens: 3000,
       temperature: 0.5,
     });
 
     res.json({
       message: response.data.choices[0].text,
     })
 
 });




 app.listen(5000, console.log('server running on localhost:5000'));