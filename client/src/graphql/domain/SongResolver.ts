/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const useAddSongMutation = gql`
  mutation ($artist: String!, $name: String!, $lyrics: String!, $to: String!, $ownerId: Float!, $language: String!) {
    addSong (artist: $artist, name: $name, lyrics: $lyrics, to: $to, ownerId: $ownerId, language: $language) {
      song {
        id
      }
    }
  }
`;

export const useGetSongQuery = gql`
  query ($id: Float!) {
    getSong (id: $id) {
      song {
        id
        name
        nameTranslation
        artist
        lyricsDeconstructed
        ownerId
        language
        albumCoverUrl
      }
    }
  }
`;

export const useSearchSongsQuery = gql`
  query ($searchTerm: String!) {
    searchSongs (searchTerm: $searchTerm) {
      songs {
        id
        name
        artist
        language
        albumCoverUrl
      }
    }
  }
`;
