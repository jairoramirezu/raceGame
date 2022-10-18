const emojis = {
  '-': ' ',
  'O': '🚪',
  'X': '💣',
  'I': '🇻🇪',
  'PLAYER': '🏃‍♂️',
  'BOMB_COLLISION': '🔥',
  'GAME_OVER': '👎',
  'WIN': '🏆',
  'HEART': '♥️'
};

const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O---------
  XXXXXXXXX-
  XXXXXXXXX-
  XXXXXXXXX-
  XXXXXXXXX-
  XXXXXXXXX-
  XXXXXXXXX-
  XXXXXXXXX-
  XXXXXXXXX-
  XXXXXXXXXI
  `);
maps.push(`
  ---------I
  -X-XX-XXXX
  -XXXXXXXXX
  -X-XXXXXXX
  -XXXX--XXX
  -XXXXX-XXX
  -X-----XXX
  -XXXXXXXXX
  -XXXXXXXXX
  ---------O
`);maps.push(`
  XXXXXXXXXO
  XXXXX-XX--
  XX-------X
  XX-XXXXX-X
  XXXXXXX--X
  XXXXXXX-XX
  XXXXXXX--X
  X--XX---XX
  XIXX---XXX
  X----XXXXX
`);