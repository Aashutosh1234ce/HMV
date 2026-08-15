// Authentic Nepal stock photography (Pexels). Runtime URLs keep the bundle light.
const px = (id, w, h) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

// CORS-enabled proxy (images.weserv.nl) — required so WebGL textures can
// actually display these cross-origin photos without tainting the canvas.
export const wsv = (id, w, h) =>
  `https://images.weserv.nl/?url=images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg&w=${w}&h=${h}&fit=cover&output=jpg`;

export const IMG = {
  hero: px(37836764, 2400, 1500),
  machapuchare: px(34765416, 1400, 1000),
  annapurnaDawn: px(15280106, 1600, 1000),
  aerialPhewa: px(12717176, 1400, 1000),
  boatsSunset: px(37836760, 1400, 1000),
  womanRowing: px(33269874, 1400, 1000),
  colorfulBoats: px(35917995, 1200, 900),
  boatsForest: px(31761382, 1200, 900),
  pokharaStreet: px(19559235, 1400, 1000),
  pokharaRoad: px(35869362, 1400, 1000),
  pokharaAnnapurna: px(13517454, 900, 1300),
  pokharaParaglide: px(9336318, 900, 1300),
  pokharaMisty: px(9858156, 900, 1300),
  pokharaSunset: px(35789857, 900, 1300),
  pokharaPagoda: px(35504526, 900, 1300),
  pokharaBoatBw: px(6564656, 900, 1300),
  nyatapola: px(32563830, 1400, 1000),
  bhaktapurStreet: px(31928613, 1200, 900),
  durbarSquare: px(31928619, 1200, 900),
  kathmanduTemple: px(37585010, 1200, 900),
  boudhanath: px(36727736, 1400, 1000),
  prayerFlags1: px(16128648, 1200, 900),
  prayerFlags3: px(32132397, 1400, 1000),
  foodThali: px(29148133, 1400, 1000),
  foodMomos: px(5409010, 1200, 900),
  foodFeast: px(32083366, 1200, 900),
  room1: px(2346091, 1200, 900),
  room2: px(35261473, 1200, 900),
  room3: px(26859068, 1200, 900),
  room4: px(36676784, 1200, 900),
  spa: px(1926811, 1400, 1000),
  mithilaArt: px(10653309, 1000, 1300),
  dhakaElder: px(11975215, 1000, 1300),

  // Cheese Shop
  cheeseBoard: px(5732751, 1200, 900),
  cheesePlatter: px(20522416, 900, 1200),
  cheeseArtisan: px(28575893, 900, 1200),
  cheeseElegant: px(34621128, 900, 1200),

  // Aozora Japanese Restaurant
  sushiDonburi: px(20571459, 900, 1200),
  ramenBowl: px(31317031, 900, 1200),
  ramenSushi: px(31418918, 900, 1200),
  ramenSushi2: px(31317028, 900, 1200),
  bambooDining: px(1860198, 1200, 900),
  outdoorCafe: px(38262288, 1200, 900),
};
