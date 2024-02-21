# Music Musings

I like listening to music, and like sharing my music tastes with others! I'm also fascinated by machine learning and currently do academic research with multimodal models. I decided to combine the two through a game: given an AI-generated song cover and song lyric, guess the song out of six options. This way, I hope people can learn my music tastes but in a fun manner.

## Setup

After cloning the project: with

```git clone https://github.com/briyanchiyang/musicguess.git```

run: `yarn start`. Then, go to [http://localhost:3000](http://localhost:3000) to view the project in your browser.

The instructions from that point on should be straightforward. Click the "Log into Spotify" button, and then the "Start Game" button. Wait for the image and quote to pop up, and guess which song it is related to! Then, click "Next round" to advance to the next prompt.


## API Usage

I use the following APIs:

### Spotify API:
- Authorization: I request for Spotify to grant me authorization to use Spotify data. I use the [implicit grant flow](https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow) - it might not be best for larger applications since the access tokens are short-lived, but works completely fine for something like this. From this authorization, I attain the access token that I can then use for requesting data.

- Data GET request: I fetch the top 50 songs that the user has listened to of all time, as outlined [here](https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists). I pick six of them for each game, and pick one of them to be the "correct" song.


### OpenAI API:
- Authorization: The authorization for OpenAI was far easier: I just made a key and imported the OpenAI Node.js package as outlined [here](https://platform.openai.com/docs/api-reference/authentication).
- DALL-E: Given the song album, name, and artists, I ask DALL-E 3 to generate a song cover that is representative of the song.
- GPT-4: I ask GPT-4 to geenrate a lyric that could feasibly be in the song.

## Limitations/Further Steps
- Error-handling: it could be much more robust, e.g. when GET requests / authorization throws an error
- Better song covers: The ChatGPT-generated song covers are much better than the API-generated ones - I don't know why, and apparently that's something others are experiencing too, but it'd be nice to fix it.
- Visuals: the game could look better! I'm no CSS expert, but can definitely spice it up.   