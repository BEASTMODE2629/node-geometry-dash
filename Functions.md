### .levels()


| Parameters | Description | Example | Type |
| :---: | :---: | :---: | :---: |
| name | The level name/id | "Bloodbath" | [String](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String) |
| [options] | The level options | {...} | [Object](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object) |

Returns {Promise\<Array\<LevelObject\>>}

---

### .users()


| Parameters | Description | Example | Type |
| :---: | :---: | :---: | :---: |
| name | The user name/id | "AnnoyingDog87" | [String](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String) |
| [options] | The search options | {...} | [Object](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object) |

Returns {Promise\<Array\<UserObject\>>}

---

### .user()


| Parameters | Description | Example | Type |
| :---: | :---: | :---: | :---: |
| extID | The user extID | "3626073" | [String](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String) |

Returns {Promise\<ExtendedUserObject\>}

---

### .mapPacks()


| Parameters | Description | Example | Type |
| :---: | :---: | :---: | :---: |
| page | The page to find the mappacks | 0 | [Number](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number) |

Returns {Promise\<Array\<MapPackObject\>>}

---

### .comments()


| Parameters | Description | Example | Type |
| :---: | :---: | :---: | :---: |
| level | The level id | 0 | [Number](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number) |
| page | The page to find the comments | 0 | [Number](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number) |

Returns {Promise\<Array\<CommentObject\>>}

---

### .accountComments()


| Parameters | Description | Example | Type |
| :---: | :---: | :---: | :---: |
| account | The account id | 0 | [Number](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number) |
| page | The page to find the comments | 0 | [Number](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number) |

Returns {Promise\<Array\<AccountCommentObject\>>}

---

### .leaderboards()


| Parameters | Description | Example | Type |
| :---: | :---: | :---: | :---: |
| type | The leaderboards type | "creators" | [String](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String) |

Returns {Promise\<Array\<UserObject\>\>}

---

### .song()


| Parameters | Description | Example | Type |
| :---: | :---: | :---: | :---: |
| id | The song id | 0 | [Number](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number) |

Returns {Promise\<SongObject\>}



---

Made by [AnnoyingDog87](https://github.com/annoyingdog87/)