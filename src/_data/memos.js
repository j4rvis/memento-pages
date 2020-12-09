const fetch = require('node-fetch')

const MEMO_URL = 'https://admin.schwarz-micha.de/memos/'

module.exports = async () => {
  return fetch(MEMO_URL).then(res => res.json())
}