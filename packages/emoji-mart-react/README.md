# `@slidoapp/emoji-mart-react`

A React wrapper for [EmojiMart](https://missiveapp.com/open/emoji-mart).
This is a fork of Emoji Mart, done by [slidoapp](https://github.com/slidoapp/emoji-mart/), which fixes some a11y issues.

## 🧑‍💻 Usage
```sh
npm install --save @slidoapp/emoji-mart @slidoapp/emoji-mart-data @slidoapp/emoji-mart-react
```

```js
import data from '@slidoapp/emoji-mart-data'
import Picker from '@slidoapp/emoji-mart-react'

function App() {
  return (
    <Picker data={data} onEmojiSelect={console.log} />
  )
}
```

## 📚 Documentation
See https://github.com/slidoapp/emoji-mart#react
