import { Song } from '../entity/Song';
import { Response } from 'express';
import { lyricsDeconstructor } from '../app/core/lyricsDeconstructor';
import { translateWord, getAlbumCover } from '../app/core/translatorSimulator';
import { elasticSearchClient } from '../clients/elasticSearchClient';

export class SongRepository {
  async addSong(
    name: string,
    artist: string,
    lyrics: string,
    to: string,
    ownerId: number,
    language: string,
    res: Response,
  ): Promise<Song> {
    const nameTranslation = await translateWord(name, to);
    const lyricsDeconstructed = JSON.stringify(await lyricsDeconstructor(lyrics, to));
    const albumCoverUrl = await getAlbumCover(`${artist} ${name}`);
    const { identifiers } = await Song.insert({
      ownerId,
      name,
      nameTranslation,
      artist,
      lyricsDeconstructed,
      to,
      language,
      albumCoverUrl,
    });

    
    const songId = identifiers[0].id;
    
    await elasticSearchClient.index({
      index: 'songs',
      body: {
        songId,
        name,
        artist,
      }
    })

    const song = await Song.findOne({ where: { id: songId } });
    
    if (!song) {
        throw new Error('database error');
    }
    return song;
  }

  async getSong(id: number): Promise<Song> {
    const song = await Song.findOne({ where: { id } });
    if (!song) {
      throw new Error('database error');
    }
    return song;
  }

  async searchSong(searchTerm: string): Promise<Array<Song>> {
    const { body } = await elasticSearchClient.search({
      index: 'songs',
      body: {
        "query": {
          "multi_match" : {
            "query": searchTerm, 
            "fields": [ "artist", "name" ] 
          }
        }
      }
    });
    const songs: Array<Song> = [];
    const searchResults = body.hits.hits;
    for (const searchResult of searchResults) {
      const song = await this.getSong(searchResult._source.songId);
      songs.push(song);
    }
    return songs;
  }
}