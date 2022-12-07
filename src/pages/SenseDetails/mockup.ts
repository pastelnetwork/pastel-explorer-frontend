/* eslint-disable */
function getNoiseHelper() {
  class Grad {
    x: number;

    y: number;

    z: number;

    constructor(x: number, y: number, z: number) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    dot2(x: number, y: number) {
      return this.x * x + this.y * y;
    }

    dot3(x: number, y: number, z: number) {
      return this.x * x + this.y * y + this.z * z;
    }
  }

  const grad3 = [
    new Grad(1, 1, 0),
    new Grad(-1, 1, 0),
    new Grad(1, -1, 0),
    new Grad(-1, -1, 0),
    new Grad(1, 0, 1),
    new Grad(-1, 0, 1),
    new Grad(1, 0, -1),
    new Grad(-1, 0, -1),
    new Grad(0, 1, 1),
    new Grad(0, -1, 1),
    new Grad(0, 1, -1),
    new Grad(0, -1, -1),
  ];
  const p = [
    151,
    160,
    137,
    91,
    90,
    15,
    131,
    13,
    201,
    95,
    96,
    53,
    194,
    233,
    7,
    225,
    140,
    36,
    103,
    30,
    69,
    142,
    8,
    99,
    37,
    240,
    21,
    10,
    23,
    190,
    6,
    148,
    247,
    120,
    234,
    75,
    0,
    26,
    197,
    62,
    94,
    252,
    219,
    203,
    117,
    35,
    11,
    32,
    57,
    177,
    33,
    88,
    237,
    149,
    56,
    87,
    174,
    20,
    125,
    136,
    171,
    168,
    68,
    175,
    74,
    165,
    71,
    134,
    139,
    48,
    27,
    166,
    77,
    146,
    158,
    231,
    83,
    111,
    229,
    122,
    60,
    211,
    133,
    230,
    220,
    105,
    92,
    41,
    55,
    46,
    245,
    40,
    244,
    102,
    143,
    54,
    65,
    25,
    63,
    161,
    1,
    216,
    80,
    73,
    209,
    76,
    132,
    187,
    208,
    89,
    18,
    169,
    200,
    196,
    135,
    130,
    116,
    188,
    159,
    86,
    164,
    100,
    109,
    198,
    173,
    186,
    3,
    64,
    52,
    217,
    226,
    250,
    124,
    123,
    5,
    202,
    38,
    147,
    118,
    126,
    255,
    82,
    85,
    212,
    207,
    206,
    59,
    227,
    47,
    16,
    58,
    17,
    182,
    189,
    28,
    42,
    223,
    183,
    170,
    213,
    119,
    248,
    152,
    2,
    44,
    154,
    163,
    70,
    221,
    153,
    101,
    155,
    167,
    43,
    172,
    9,
    129,
    22,
    39,
    253,
    19,
    98,
    108,
    110,
    79,
    113,
    224,
    232,
    178,
    185,
    112,
    104,
    218,
    246,
    97,
    228,
    251,
    34,
    242,
    193,
    238,
    210,
    144,
    12,
    191,
    179,
    162,
    241,
    81,
    51,
    145,
    235,
    249,
    14,
    239,
    107,
    49,
    192,
    214,
    31,
    181,
    199,
    106,
    157,
    184,
    84,
    204,
    176,
    115,
    121,
    50,
    45,
    127,
    4,
    150,
    254,
    138,
    236,
    205,
    93,
    222,
    114,
    67,
    29,
    24,
    72,
    243,
    141,
    128,
    195,
    78,
    66,
    215,
    61,
    156,
    180,
  ];
  // To remove the need for index wrapping, double the permutation table length
  const perm = new Array(512);
  const gradP = new Array(512);
  // This isn't a very good seeding function, but it works ok. It supports 2^16
  // different seed values. Write something better if you need more seeds.
  function seed(seed: number) {
    if (seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }
    seed = Math.floor(seed);
    if (seed < 256) {
      seed |= seed << 8;
    }
    for (let i = 0; i < 256; i++) {
      let v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed >> 8) & 255);
      }
      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  }
  seed(0);
  // ##### Perlin noise stuff
  function fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }
  function lerp(a: number, b: number, t: number) {
    return (1 - t) * a + t * b;
  }
  // 2D Perlin Noise
  function perlin2(x: number, y: number) {
    // Find unit grid cell containing point
    let X = Math.floor(x);
    let Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x -= X;
    y -= Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X &= 255;
    Y &= 255;
    // Calculate noise contributions from each of the four corners
    const n00 = gradP[X + perm[Y]].dot2(x, y);
    const n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
    const n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
    const n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);
    // Compute the fade curve value for x
    const u = fade(x);
    // Interpolate the four results
    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
  }

  return {
    seed,
    perlin2,
  };
}
const noise = getNoiseHelper();
noise.seed(Math.random());
const xData: number[] = [];
const yData: number[] = [];
function generateData() {
  const data = [];
  for (let i = 0; i <= 38; i += 1) {
    for (let j = 0; j <= 37; j += 1) {
      // let x = (max - min) * i / 200 + min;
      // let y = (max - min) * j / 100 + min;
      data.push([i, j, noise.perlin2(i / 40, j / 20) + 0.5]);
      // data.push([i, j, normalDist(theta, x) * normalDist(theta, y)]);
    }
    yData.push(i);
  }
  for (let j = 0; j <= 37; j += 1) {
    xData.push(j);
  }
  return data;
}
const data = generateData();

const graphData = {
  "nodes": [
    {
      "color": "#4f19c7",
      "label": "jquery",
      "y": -404.26147,
      "x": -739.36383,
      "id": "jquery",
      "size": 4.7252817,
      symbol: 'image://http://res.cloudinary.com/pastelnetwork/image/upload/v1/sense_demo/6d57f5e931d25d9c4aee5a4f775371ca0df18dd12525fa50e8d764a769b9f35f.jpg',
    },
    {
      "color": "#c71969",
      "label": "backbone",
      "y": -862.7517,
      "x": -134.2215,
      "id": "backbone",
      "size": 6.1554675,
      symbol: 'image://https://res.cloudinary.com/pastelnetwork/image/upload/w_900/f_auto/q_auto/v1649393594/sense_demo/b6556c14f00ddc8e8687f84ad8b24782ef9aa827e2bd327272a24950632cf057',
    },
    {
      "color": "#c71969",
      "label": "underscore",
      "y": -734.4221,
      "x": -75.53079,
      "id": "underscore",
      "size": 100.0,
      symbol: 'image://https://res.cloudinary.com/pastelnetwork/image/upload/w_900/f_auto/q_auto/v1649393594/sense_demo/55b3733f41485611952f8d96235f43e39234383d6b61ad8629928b7210d58bff',
    },
    {
      "color": "#c71969",
      "label": "faye",
      "y": 624.50604,
      "x": -818.97516,
      "id": "faye",
      "size": 0.67816025,
      symbol: 'image://https://res.cloudinary.com/pastelnetwork/image/upload/w_900/f_auto/q_auto/v1649393594/sense_demo/d4529536312de69ba020e7587126eea78e2b536e7814f2e5443aff84dbe83a91',
    },
    {
      "color": "#c71919",
      "label": "socket.io",
      "y": 120.37976,
      "x": -710.59204,
      "id": "socket.io",
      "size": 19.818306,
      symbol: 'image://https://res.cloudinary.com/pastelnetwork/image/upload/w_900/f_auto/q_auto/v1649393594/sense_demo/a37ec9caf59fd4e470d15826c91646d19ea28ddff615fa8bc3b3ae057ee03fe5',
    },
    {
      "color": "#c71969",
      "label": "requirejs",
      "y": -612.5541,
      "x": 71.52897,
      "id": "requirejs",
      "size": 4.0862627,
      symbol: 'image://https://res.cloudinary.com/pastelnetwork/image/upload/w_900/f_auto/q_auto/v1649393594/sense_demo/cf6b5e7dbca7666a38bebbbb4799d187243ee4569e8d1c4c6cd2cbc31dbca0f6',
    },
    {
      "color": "#c71969",
      "label": "amdefine",
      "y": -556.3107,
      "x": 1202.1166,
      "id": "amdefine",
      "size": 2.3822114,
      symbol: 'image://https://res.cloudinary.com/pastelnetwork/image/upload/w_900/f_auto/q_auto/v1649393594/sense_demo/cf6b5e7dbca7666a38bebbbb4799d187243ee4569e8d1c4c6cd2cbc31dbca0f6',
    },
    {
      "color": "#1984c7",
      "label": "mongoose",
      "y": 378.15536,
      "x": -1150.2018,
      "id": "mongoose",
      "size": 10.81118,
      symbol: 'image://https://res.cloudinary.com/pastelnetwork/image/upload/w_900/f_auto/q_auto/v1649393594/sense_demo/cf6b5e7dbca7666a38bebbbb4799d187243ee4569e8d1c4c6cd2cbc31dbca0f6',
    },
    {
      "color": "#c76919",
      "label": "underscore.deferred",
      "y": 477.03778,
      "x": -127.03764,
      "id": "underscore.deferred",
      "size": 0.40429485,
      symbol: 'image://https://res.cloudinary.com/pastelnetwork/image/upload/w_900/f_auto/q_auto/v1649393594/sense_demo/cf6b5e7dbca7666a38bebbbb4799d187243ee4569e8d1c4c6cd2cbc31dbca0f6',
    },
    {
      "color": "#8419c7",
      "label": "cheerio",
      "y": -404.62427,
      "x": -338.03128,
      "id": "cheerio",
      "size": 8.163814,
      symbol: 'image://https://res.cloudinary.com/pastelnetwork/image/upload/w_900/f_auto/q_auto/v1649393594/sense_demo/cf6b5e7dbca7666a38bebbbb4799d187243ee4569e8d1c4c6cd2cbc31dbca0f6',
    },
    {
      "color": "#c76919",
      "label": "lodash",
      "y": -380.16626,
      "x": 118.30771,
      "id": "lodash",
      "size": 18.935852,
      symbol: 'image://https://res.cloudinary.com/pastelnetwork/image/upload/w_900/f_auto/q_auto/v1649393594/sense_demo/cf6b5e7dbca7666a38bebbbb4799d187243ee4569e8d1c4c6cd2cbc31dbca0f6',
    },
    {
      "color": "#c71969",
      "label": "faye-websocket",
      "y": 649.6795,
      "x": -697.4635,
      "id": "faye-websocket",
      "size": 1.0128845,
      symbol: 'image://https://res.cloudinary.com/pastelnetwork/image/upload/w_900/f_auto/q_auto/v1649393594/sense_demo/cf6b5e7dbca7666a38bebbbb4799d187243ee4569e8d1c4c6cd2cbc31dbca0f6',
    },
    {
      "color": "#c71969",
      "label": "dateformat",
      "y": -531.28235,
      "x": 381.10724,
      "id": "dateformat",
      "size": 3.3863845,
      symbol: 'image://https://res.cloudinary.com/pastelnetwork/image/upload/w_900/f_auto/q_auto/v1649393594/sense_demo/cf6b5e7dbca7666a38bebbbb4799d187243ee4569e8d1c4c6cd2cbc31dbca0f6',
    }
  ],
  "edges": [
    {
      "sourceID": "jquery",
      "targetID": "underscore",
      "size": 1
    },
    {
      "sourceID": "jquery",
      "targetID": "dateformat",
      "size": 1
    },
    {
      "sourceID": "jquery",
      "targetID": "faye-websocket",
      "size": 1
    },
    {
      "sourceID": "jquery",
      "targetID": "lodash",
      "size": 1
    },
    {
      "sourceID": "backbone",
      "targetID": "cheerio",
      "size": 1
    },
    {
      "sourceID": "faye",
      "targetID": "faye-websocket",
      "size": 1
    },
    {
      "sourceID": "faye",
      "targetID": "cookiejar",
      "size": 1
    },
    {
      "sourceID": "socket.io",
      "targetID": "underscore",
      "size": 1
    },
    {
      "sourceID": "underscore",
      "targetID": "socket.io-client",
      "size": 1
    }
  ]
};

const fakeInformation = [
  {
    id: 'jquery',
    name: 'Jacques Callot The Temptation of Saint Anthony (Second Plate)',
    url: 'https://emuseum.mfah.org/objects/129927/the-temptation-of-saint-anthony-second-plate;jsessionid=350D9C543BA0DE7CDB32B2CD7571A7AC',
    ranking: 2,
    resolution: '14 × 18 1/4 in. (35.6 × 46.4 cm)',
    date: '2014-01-18',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at laoreet tellus. Etiam eget eros et diam efficitur dapibus sed non justo. Curabitur fringilla, eros eu pharetra blandit, eros tortor condimentum magna, vel consectetur diam ante ac risus. In sagittis eros at nulla sagittis, vel cursus erat scelerisque. Vestibulum dictum molestie est, ac efficitur lorem iaculis sit amet. Praesent vel dictum dui, vel mollis nunc. Suspendisse potenti. Maecenas massa sapien, aliquam vitae urna eget, euismod suscipit velit. Mauris suscipit enim faucibus sapien tempor imperdiet.',
    rarenessScore: 0.70867926,
    openNSFWScore: 0.0018216148,
    isLikelyDupe: false,
  },
  {
    id: 'underscore',
    name: 'Jacques Callot The Temptation of Saint Anthony (Second Plate)',
    url: 'https://emuseum.mfah.org/objects/129927/the-temptation-of-saint-anthony-second-plate;jsessionid=350D9C543BA0DE7CDB32B2CD7571A7AC',
    ranking: 2,
    resolution: '14 × 18 1/4 in. (35.6 × 46.4 cm)',
    date: '2014-01-18',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at laoreet tellus. Etiam eget eros et diam efficitur dapibus sed non justo. Curabitur fringilla, eros eu pharetra blandit, eros tortor condimentum magna, vel consectetur diam ante ac risus. In sagittis eros at nulla sagittis, vel cursus erat scelerisque. Vestibulum dictum molestie est, ac efficitur lorem iaculis sit amet. Praesent vel dictum dui, vel mollis nunc. Suspendisse potenti. Maecenas massa sapien, aliquam vitae urna eget, euismod suscipit velit. Mauris suscipit enim faucibus sapien tempor imperdiet.',
    rarenessScore: 0.70867926,
    openNSFWScore: 0.0018216148,
    isLikelyDupe: true,
  },
]

export { xData, data, yData, graphData, fakeInformation };
