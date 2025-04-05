export interface MoonData {
  name: string
  size: number
  color: string
}

export interface PlanetData {
  id: string
  name: string
  type: string
  size: number
  distanceFromSun: number
  realDistanceFromSun: number
  rotationSpeed: number
  orbitSpeed: number
  textureUrl: string
  diameter: number
  dayLength: string
  yearLength: string
  description: string
  videoUrl?: string
  videoSource?: {
    creator: string
    url: string
  }
  emoji?: string
  moons?: MoonData[]
}

export interface SunData {
  id: string
  name: string
  type: string
  size: number
  rotationSpeed: number
  textureUrl: string
  diameter: number
  surfaceTemp: string
  age: string
  videoUrl?: string
  videoSource?: {
    creator: string
    url: string
  }
  emoji: string
  description: string
}

export const sunData: SunData = {
  id: "sun",
  name: "Sun",
  type: "Star (G-type main-sequence)",
  size: 5,
  rotationSpeed: 0.002,
  textureUrl: "/textures/sun.jpg",
  diameter: 1_392_700,
  surfaceTemp: "5,500°C (surface), 15,000,000°C (core)",
  age: "4.6 billion years",
  videoUrl: "https://youtu.be/b22HKFMIfWo?si=Wn7xuP298cYcKDWH",
  videoSource: {
    creator: "Crash Course",
    url: "https://thecrashcourse.com/"
  },
  description:
    "The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core. The Sun radiates energy mainly as light, ultraviolet, and infrared radiation, and is the most important source of energy for life on Earth.",
  emoji: "☀️"
}

export const planets: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercury",
    type: "Terrestrial",
    size: 0.8,
    distanceFromSun: 10,
    realDistanceFromSun: 57.9,
    rotationSpeed: 0.01,
    orbitSpeed: 0.04,
    textureUrl: "/textures/planets/2k_mercury.jpg",
    diameter: 4_879,
    dayLength: "58.6 Earth days",
    yearLength: "88 Earth days",
    videoUrl: "https://youtu.be/P3GkZe3nRQ0?si=FLYtb5HvZ1SmAFj_",
    videoSource: {
      creator: "Crash Course",
      url: "https://thecrashcourse.com/"
    },
    description:
      "Mercury is the smallest and innermost planet in the Solar System. It has no atmosphere to retain heat, causing extreme temperature variations.",
  },
  {
    id: "venus",
    name: "Venus",
    type: "Terrestrial",
    size: 1.2,
    distanceFromSun: 15,
    realDistanceFromSun: 108.2,
    rotationSpeed: 0.0007,
    orbitSpeed: 0.015,
    // TODO: add venus orbit texture
    textureUrl: "/textures/planets/2k_venus_surface.jpg",
    diameter: 12_104,
    dayLength: "243 Earth days",
    yearLength: "225 Earth days",
    videoUrl: "https://youtu.be/ZFUgy3crCYY?si=PeZQEYiJxiHXiqmW",
    videoSource: {
      creator: "Crash Course",
      url: "https://thecrashcourse.com/"
    },
    description:
      "Venus is the second planet from the Sun and the hottest planet in our solar system with a thick atmosphere of carbon dioxide that traps heat.",
  },
  {
    id: "earth",
    name: "Earth",
    type: "Terrestrial",
    size: 1.3,
    distanceFromSun: 20,
    realDistanceFromSun: 149.6,
    rotationSpeed: 0.01,
    orbitSpeed: 0.01,
    textureUrl: "/textures/planets/2k_earth_daymap.jpg",
    diameter: 12_756,
    dayLength: "24 hours",
    yearLength: "365.25 days",
    videoUrl: "https://youtu.be/w-9gDALvMF4?si=uY9fvcCzYf_uxmx2",
    videoSource: {
      creator: "Crash Course",
      url: "https://thecrashcourse.com/"
    },
    description:
      "Earth is the third planet from the Sun and the only astronomical object known to harbor life. It has one natural satellite, the Moon.",
    moons: [
      {
        // TODO: add moon texture for more realistic look
        name: "Moon",
        size: 0.3,
        color: "#CCCCCC",
      },
    ],
    emoji: "🌎"
  },
  {
    id: "mars",
    name: "Mars",
    type: "Terrestrial",
    size: 0.9,
    distanceFromSun: 25,
    realDistanceFromSun: 227.9,
    rotationSpeed: 0.01,
    orbitSpeed: 0.008,
    textureUrl: "/textures/planets/2k_mars.jpg",
    diameter: 6_779,
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
    videoUrl: "https://youtu.be/I-88YWx71gE?si=cY4nQE-S6a0I_MvP",
    videoSource: {
      creator: "Crash Course",
      url: "https://thecrashcourse.com/"
    },
    description:
      "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, known as the 'Red Planet' due to its reddish appearance.",
    moons: [
      {
        name: "Phobos",
        size: 0.1,
        color: "#AAAAAA",
      },
      {
        name: "Deimos",
        size: 0.08,
        color: "#999999",
      },
    ],
    emoji: "🌕"
  },
  {
    id: "jupiter",
    name: "Jupiter",
    type: "Gas Giant",
    size: 3,
    distanceFromSun: 32,
    realDistanceFromSun: 778.5,
    rotationSpeed: 0.04,
    orbitSpeed: 0.004,
    textureUrl: "/textures/planets/2k_jupiter.jpg",
    diameter: 139_820,
    dayLength: "9.9 hours",
    yearLength: "11.9 Earth years",
    videoUrl: "https://youtu.be/Xwn8fQSW7-8?si=2T_BKvoTlp3Kob0J",
    videoSource: {
      creator: "Crash Course",
      url: "https://thecrashcourse.com/"
    },
    description:
      "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets combined.",
    moons: [
      {
        name: "Io",
        size: 0.2,
        color: "#FFCC00",
      },
      {
        name: "Europa",
        size: 0.2,
        color: "#EEEEEE",
      },
      {
        name: "Ganymede",
        size: 0.3,
        color: "#BBBBBB",
      },
      {
        name: "Callisto",
        size: 0.25,
        color: "#888888",
      },
    ],
    emoji: "🌕"
  },
  {
    id: "saturn",
    name: "Saturn",
    type: "Gas Giant",
    size: 2.5,
    distanceFromSun: 40,
    realDistanceFromSun: 1_434.0,
    rotationSpeed: 0.04,
    orbitSpeed: 0.002,
    textureUrl: "/textures/planets/2k_saturn.jpg",
    diameter: 116_460,
    dayLength: "10.7 hours",
    yearLength: "29.5 Earth years",
    videoUrl: "https://youtu.be/E8GNde5nCSg?si=OYmmYR5xTKfkt_Vr",
    videoSource: {
      creator: "Crash Course",
      url: "https://thecrashcourse.com/"
    },
    description:
      "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, known for its prominent ring system made up of ice particles, rocky debris, and dust.",
    moons: [
      {
        name: "Titan",
        size: 0.3,
        color: "#DDAA55",
      },
      {
        name: "Enceladus",
        size: 0.15,
        color: "#FFFFFF",
      },
    ],
    emoji: "🪐"
  },
  {
    id: "uranus",
    name: "Uranus",
    type: "Ice Giant",
    size: 1.8,
    distanceFromSun: 47,
    realDistanceFromSun: 2_871.0,
    rotationSpeed: 0.01,
    orbitSpeed: 0.0007,
    textureUrl: "/textures/planets/2k_uranus.jpg",
    diameter: 50_724,
    dayLength: "17.2 hours",
    yearLength: "84 Earth years",
    videoUrl: "https://youtu.be/1hIwD17Crko?si=uUeeuaXQVxH9CqvV",
    videoSource: {
      creator: "Crash Course",
      url: "https://thecrashcourse.com/"
    },
    description:
      "Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System and rotates on its side.",
    moons: [
      {
        name: "Titania",
        size: 0.2,
        color: "#AACCDD",
      },
      {
        name: "Oberon",
        size: 0.18,
        color: "#99BBCC",
      },
    ],
    emoji: "🌕"
  },
  {
    id: "neptune",
    name: "Neptune",
    type: "Ice Giant",
    size: 1.7,
    distanceFromSun: 54,
    realDistanceFromSun: 4_495.0,
    rotationSpeed: 0.01,
    orbitSpeed: 0.0005,
    textureUrl: "/textures/planets/2k_neptune.jpg",
    diameter: 49_244,
    dayLength: "16.1 hours",
    yearLength: "165 Earth years",
    videoUrl: "https://youtu.be/1hIwD17Crko?si=FQBZTkXQPrts-6Jn&t=395",
    videoSource: {
      creator: "Crash Course",
      url: "https://thecrashcourse.com/"
    },
    description:
      "Neptune is the eighth and farthest-known planet from the Sun. It is the fourth-largest planet by diameter and the third-largest by mass, known for its strong winds and Great Dark Spot.",
    moons: [
      {
        name: "Triton",
        size: 0.22,
        color: "#CCDDEE",
      },
    ],
    emoji: "🌕"
  },
]

