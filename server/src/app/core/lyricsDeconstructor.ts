import { translateWord, translateLine, getImageUrl } from './translatorSimulator';

interface translatedWordObject {
  original: string,
  translation: string,
  imageUrl: string,
}

interface translatedLineObject {
  translatedWords: Array<translatedWordObject>,
  original: string,
  translation: string,
}

export const lyricsDeconstructor = async (lyrics: string, to: string): Promise<Array<translatedLineObject>> => {

  try {
    const lines: Array<string> = lyrics.split('\n');
    let translatedLineObjectArray: Array<translatedLineObject> = [];
    for (const line of lines) {
      if(line.length){
        translatedLineObjectArray.push(await lineObjectCreator(line, to));
      }
    }
    return translatedLineObjectArray;
  } catch (error) {
    console.log(error);
  }
}

async function lineObjectCreator (line: string, to:string): Promise<translatedLineObject> {
  const words: Array<string> = line.split(' ');
  let translatedWords: Array<translatedWordObject> = [];
  for (const word of words) {
    translatedWords.push(await translatedWordObjectCreator(word, to));
  }

  const translation = await translateLine(line, to);
  
  return {
    translatedWords,
    original: line,
    translation
  }
}

async function translatedWordObjectCreator (word: string, to:string): Promise<translatedWordObject> {
  const translation = await translateWord(word, to);
  const imageUrl = await getImageUrl(translation);
  return {
    original: word,
    translation,
    imageUrl,
  };
}

