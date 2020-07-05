# woioi-app

This is a personal pet project.

## Overview

Learn languages through songs. For now, it is suited for English speakers that want to learn an another language.

![alt text](https://i.imgur.com/xuKQsZb.jpg)

It is possible to register and also login. Once registered or logged in, client receives JWT refresh token and JWT access token. Refresh token is stored in a cookie, but access token is stored in memory. For each request user sends access token, and refresh token is used to get new access token on page reload, after access token expires (15 minutes) etc. This is extra security layer.

![alt text](https://i.imgur.com/bJvbseM.jpg)

Then, let's say you want to understand lyrics of a song in Russian. You input song's name, artist and lyrics. The language is automatically detected.

![alt text](https://i.imgur.com/nMvzbvt.jpg)

You now have original lyrics decoupled into individual words that you can click, hear how it is pronounciated and get a representation of it as a picture.

![alt text](https://i.imgur.com/YFgDQyR.png)

You also have in smaller text the translation of the whole sentence.

![alt text](https://i.imgur.com/irlfJoi.png)

Finally, you can also search songs

![alt text](https://i.imgur.com/WC7ydMT.jpg)

## Technologies used
### client
html

css + tailwindcss microframework

javascript + vue.js

apollo client for graphql

vuex for storage

### server
nodejs + express

typescript

apollo for graphql

type-graphql

typeorm (ORM)

elasticsearch

postgresql

TODO:
dockerize app. otherwise, to run it you must have elasticsearch and postgresql running on your machine
