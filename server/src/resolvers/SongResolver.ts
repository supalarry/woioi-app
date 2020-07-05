import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware, Int } from 'type-graphql';
import { Song } from '../entity/Song';
import { AppContext } from '../interfaces/AppContext';
import { lyricsDeconstructor } from '../app/core/lyricsDeconstructor';
import { translateWord, getAlbumCover } from '../app/core/translatorSimulator';
import { elasticSearchClient } from '../clients/elasticSearchClient';
import { SongRepository } from '../repositories/SongRepository';

@ObjectType()
class SongResponse {
    @Field(() => Song)
    song: Song;
}

@ObjectType()
class SongsResponse {
    @Field(() => [Song])
    songs: Array<Song>;
}

@Resolver()
export class SongResolver {
  songRepository: SongRepository;
    
  constructor() {
      this.songRepository = new SongRepository();
  }
  @Mutation(() => SongResponse)
  async addSong(
    @Arg('name') name: string,
    @Arg('artist') artist: string,
    @Arg('lyrics') lyrics: string,
    @Arg('to') to: string,
    @Arg('ownerId') ownerId: number,
    @Arg('language') language: string,
    @Ctx() { res }: AppContext
  ): Promise<SongResponse> {
    const song = await this.songRepository.addSong(name, artist, lyrics, to, ownerId, language, res);
    return {
      song,
    }
  }

  @Query(() => SongResponse)
  async getSong(@Arg('id') id: number): Promise<SongResponse> {
    const song = await this.songRepository.getSong(id);
    return {
      song,
    }
  }

  @Query(() => SongsResponse)
  async searchSongs(@Arg('searchTerm') searchTerm: string): Promise<SongsResponse> {
    const songs = await this.songRepository.searchSong(searchTerm);
    return {
      songs,
    };
  }
}