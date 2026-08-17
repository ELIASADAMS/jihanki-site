window.AOKIGAHARA = {
  title: "AOKIGAHARA",
  subtitle: "PROCEDURAL AMBIENT PENTALOGY",
  year: "2026",
  author: "ELI / ILYA MININ",
  engine: "SONIC PI",
  status: "EVOLVING",
  phase: "PROCEDURAL DEVELOPMENT",

  environments: [
    {
      id: "fujisan",
      title: "FUJISAN",
      time: "GEOLOGICAL",
      description: "Mass, pressure and extremely slow transformation.",
      render: "../../media/music/fuji-sonicpi-01.mp3",
    },
    {
      id: "aokigahara",
      title: "AOKIGAHARA",
      time: "BIOLOGICAL",
      description: "Growth, density, decay and environmental memory.",
      render: "../../media/music/fuji-sonicpi-02.mp3",
    },
    {
      id: "saiko",
      title: "SAIKO",
      time: "REFLECTIVE",
      description: "Water, echoes, distance and returning memory.",
      render: "../../media/music/fuji-sonicpi-03.mp3",
    },
    {
      id: "village",
      title: "VILLAGE",
      time: "SOCIAL",
      description: "Human traces, infrastructure and abandoned routines.",
      render: "../../media/music/fuji-sonicpi-04.mp3",
    },
    {
      id: "shrine",
      title: "SHRINE",
      time: "RITUAL",
      description:
        "Recurrence, ceremony and the Kagura Machine. Public render pending.",
      render: null,
    },
  ],

  state: [
    ["activity", "Current capacity to generate events", 0.72],
    ["memory reliability", "Probability of successful recall", 0.61],
    ["instability", "Timing and parameter drift", 0.34],
    ["spectral brightness", "High-frequency presence", 0.48],
    ["human presence", "Density of human traces", 0.27],
    ["ritual intensity", "Degree of patterned recurrence", 0.55],
    ["corruption", "Deviation from remembered material", 0.31],
    ["residue", "Surviving environmental activity", 0.42],
    ["dissolution", "Degree of systemic disappearance", 0.18],
  ],
};
