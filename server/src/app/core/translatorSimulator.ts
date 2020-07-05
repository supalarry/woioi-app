const translate = require('@vitalets/google-translate-api');
const axios = require('axios').default;
const gis = require('g-i-s');

export const translateLine = async (line: string, to: string): Promise<string> => {
  const translation = await translate(line, {to: to});
  return translation.text;
}

export const translateWord = async (word: string, to:string): Promise<string> => {
  word = word.replace(/^\s+|\s+$/g, '');
  word = word.replace(/,/g, '');
  const translation = await translate(word, {to: to});
  return translation.text;
}

const unsplashAccessKey = 'obgU8UQBD7rz30WzgiCvcHGO-0otvF4E6RP_0_WhGnU';

export const getImageUrl = async (word: string): Promise<string> => {
  const unslpashApiUrl = `https://api.unsplash.com/search/photos/?client_id=${unsplashAccessKey}&query=${word}&page=1&per_page=1`;
  // console.log(unslpashApiUrl);
  const response = await axios.get(unslpashApiUrl);
  if (response.data.results[0]) {
    return response.data.results[0].urls.regular;
  }
  return '';
}

export const getAlbumCover = async (artistAndName: string): Promise<any> => {
  let promise = await new Promise((resolve, reject) => {
    gis(artistAndName, (error: any, results: any) => {
      if (error) {
        console.log(error);
      }
      resolve(results[0].url);
    })
  })
  .catch(err => {throw err});
  return promise;
}
