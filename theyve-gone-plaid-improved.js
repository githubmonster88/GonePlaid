/**
 * @title They've Gone Plaid - Documented & Improved Version
 * @author nukleas
 * @description An electronic music composition in C minor featuring layered
 * synthesizers, drum machines, and dynamic effects. The track follows a
 * traditional song structure with intro, verses, choruses, a bridge, climax, and outro.
 *
 * @platform Strudel (https://strudel.cc)
 * @genre Electronic / EDM
 * @key C Minor
 * @bpm 140
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Visual color palette for track visualization.
 * Colors represent different frequency ranges and instrument layers.
 */
const plaidColors = [
  "#FFD700", // Gold - Drums/Percussion
  "#FFA500", // Orange - Bass/Low frequencies
  "#DC143C", // Crimson - Mid frequencies/Leads
  "#8B0000", // Dark Red - Pads/Atmosphere
  "#FFFFFF"  // White - High frequencies/Accents
];

/**
 * Audio configuration constants.
 * Centralized location for all audio parameters.
 */
const AUDIO_CONFIG = {
  // Tempo
  bpm: 140,
  cpmDivider: 4, // Cycles per minute divider for Strudel timing

  // Drum machine samples
  drums: {
    bank: "RolandTR909",
    samples: {
      kick: "bd",      // Bass drum
      snare: "sd",     // Snare drum
      hihat: "hh",     // Hi-hat
      clap: "cp"       // Handclap
    }
  },

  // Filter frequencies (in Hz)
  filters: {
    veryLow: 400,
    low: 600,
    mid: 800,
    midHigh: 1200,
    high: 1500,
    veryHigh: 2000,
    ultraHigh: 3000
  },

  // Delay times (in beats)
  delays: {
    short: 0.0625,   // 1/16th note
    medium: 0.125,   // 1/8th note
    long: 0.25       // 1/4 note
  },

  // Gain levels (0.0 to 1.0+)
  gain: {
    quiet: 0.3,
    low: 0.4,
    medium: 0.5,
    medHigh: 0.6,
    high: 0.7,
    veryHigh: 0.8,
    loud: 0.9,
    veryLoud: 1.1,
    drop: 1.2
  },

  // Reverb room sizes
  room: {
    tight: 0.2,
    small: 0.3,
    medium: 0.4,
    large: 0.5,
    huge: 0.7,
    cathedral: 0.8
  }
};

/**
 * Musical patterns and progressions.
 * Extracted for reusability and easier modifications.
 */
const MUSICAL_PATTERNS = {
  // Chord progression in C minor (i - VI - iv - VII)
  // Using scale degrees: [0,3,7] = C minor triad, [5,8,12] = Ab major, etc.
  chords: {
    // 3-note voicing for lighter sections
    basic: "<[0,3,7] [5,8,12] [-2,2,5] [-5,-2,2]>",
    // 4-note voicing for fuller sections
    extended: "<[0,3,7,12] [5,8,12,17] [-2,2,5,10] [-5,-2,2,7]>"
  },

  // Melodic patterns
  melodies: {
    verse: "0 2 4 7 9 7 4 2",           // Ascending then descending in C minor
    chorus: "0 ~ 7 9 ~ 7 4 0, ~ 3 ~ 5 7 ~ 9 7", // Syncopated melody
    bridge: "~ 0 ~ 3 ~ 4 ~ 7",          // Sparse, open melody
    outro: "9 7 4 2 0 ~ ~ ~"            // Descending resolution
  },

  // Bass patterns
  bass: {
    chorus: "0 -5 0 -3 0 -5 -7 -5",     // Walking bass
    climax: "0 0 -5 -5 0 0 -3 -7",      // Repeated notes for intensity
    drop: "0 0 -5 -3"                   // Simple, powerful pattern
  }
};

// ============================================================================
// MAIN COMPOSITION CLASS
// ============================================================================

/**
 * ElectroStack - Main composition class.
 *
 * This class organizes the track into distinct sections, each returning a
 * Strudel pattern. The play() method sequences these sections into a complete
 * arrangement.
 *
 * @class
 */
class ElectroStack {

  /**
   * Intro section (4 bars)
   * Sparse drums to establish the groove.
   *
   * @returns {Pattern} Strudel pattern for intro
   */
  intro() {
    return stack(
      // Minimal kick and hi-hat pattern
      s("bd ~ ~ ~, ~ ~ hh ~")
    );
  }

  /**
   * Verse section (4 bars)
   * Introduces melody with triangle wave, builds drum complexity.
   *
   * @returns {Pattern} Strudel pattern for verse
   */
  verse() {
    return stack(
      // Drums: Euclidean rhythms create evolving patterns
      // bd*<1 2 4 8> = kick drum with 1, 2, 4, then 8 hits per cycle
      // hh*<4 8 16 32> = hi-hat accelerating from 4 to 32 hits
      s("bd*<1 2 4 8>, hh*<4 8 16 32>").bank(AUDIO_CONFIG.drums.bank),

      // Lead melody: Triangle wave for smooth, classic synth sound
      n(MUSICAL_PATTERNS.melodies.verse)
        .scale("C5:minor")              // C minor in 5th octave
        .s("triangle")                  // Triangle wave synthesizer
        .room(AUDIO_CONFIG.room.small)  // Small room reverb
        .gain(AUDIO_CONFIG.gain.medium) // Medium volume
    );
  }

  /**
   * Chorus section (8 bars)
   * Full arrangement with drums, bass, lead, and pad layers.
   * This is the main hook of the track.
   *
   * @returns {Pattern} Strudel pattern for chorus
   */
  chorus() {
    return stack(
      // Layer 1: Drums - Kick, snare, hi-hat, and clap pattern
      s("[bd sd]*2, hh*8, [~ cp]*2")
        .bank(AUDIO_CONFIG.drums.bank)
        .room(AUDIO_CONFIG.room.tight)
        .color(plaidColors[0]),

      // Layer 2: Bass - Walking bass line with sweeping filter
      n(MUSICAL_PATTERNS.bass.chorus)
        .scale("C2:minor")              // Low octave for bass
        .s("supersaw")                  // Rich, detuned saw waves
        .lpf(
          // Dynamic low-pass filter sweeps from 400Hz to 2000Hz
          sine.range(AUDIO_CONFIG.filters.veryLow, AUDIO_CONFIG.filters.veryHigh)
            .slow(4)                    // 4 bars per sweep cycle
        )
        .gain(AUDIO_CONFIG.gain.medHigh)
        .color(plaidColors[1]),

      // Layer 3: Lead melody - Syncopated triangle wave with delay
      n(MUSICAL_PATTERNS.melodies.chorus)
        .scale("C5:minor")
        .s("triangle")
        .room(AUDIO_CONFIG.room.large)
        .delay(0.25)                    // Delay mix
        .delaytime(AUDIO_CONFIG.delays.medium) // 1/8th note delay
        .color(plaidColors[2])
        // Variations: Sometimes reverse, every 4 bars transpose up an octave
        .sometimes((x) => x.rev())
        .every(4, (x) => x.add(12)),    // +12 semitones = +1 octave

      // Layer 4: Pad - Slow chord progression for atmosphere
      n(MUSICAL_PATTERNS.chords.basic)
        .scale("C4:minor")
        .s("supersaw")                  // Thick pad sound
        .lpf(AUDIO_CONFIG.filters.mid)  // Filter to keep out of lead's way
        .gain(AUDIO_CONFIG.gain.quiet)  // Low volume for background
        .room(AUDIO_CONFIG.room.huge)   // Large reverb for space
        .slow(2)                        // Half-speed chord changes
        .color(plaidColors[3])
    );
  }

  /**
   * Bridge section (4 bars)
   * Breaks down to sparse elements, provides contrast before returning to chorus.
   *
   * @returns {Pattern} Strudel pattern for bridge
   */
  bridge() {
    return stack(
      // Minimal drums: Just snare and hi-hat
      s("~ ~ sd ~, hh hh ~ ~").color(plaidColors[0]),

      // Simple sine wave melody - clean and pure
      n(MUSICAL_PATTERNS.melodies.bridge)
        .scale("C6:minor")              // High octave for brightness
        .s("sine")                      // Pure sine wave (no harmonics)
        .room(AUDIO_CONFIG.room.huge)
        .gain(AUDIO_CONFIG.gain.low)
        .slow(2),                       // Slow, spacious feel

      // Background pad keeps harmonic movement
      n(MUSICAL_PATTERNS.chords.basic)
        .scale("C4:minor")
        .s("supersaw")
        .lpf(AUDIO_CONFIG.filters.mid)
        .gain(AUDIO_CONFIG.gain.quiet)
        .room(AUDIO_CONFIG.room.huge)
        .slow(2)
    );
  }

  /**
   * Climax section (4 bars)
   * Maximum energy with all layers active, increased gain, and complex rhythms.
   *
   * @returns {Pattern} Strudel pattern for climax
   */
  climax() {
    return stack(
      // Layer 1: Intense drum pattern with all elements
      s("[bd bd]*2, sd*4, hh*16, [cp ~]*4")
        .bank(AUDIO_CONFIG.drums.bank)
        .room(AUDIO_CONFIG.room.small)
        .gain(AUDIO_CONFIG.gain.veryLoud) // Increased gain for impact
        .color(plaidColors[0]),

      // Layer 2: Aggressive bass with fast filter sweep
      n(MUSICAL_PATTERNS.bass.climax)
        .scale("C2:minor")
        .s("supersaw")
        .lpf(
          sine.range(AUDIO_CONFIG.filters.mid, AUDIO_CONFIG.filters.ultraHigh)
            .fast(2)                    // Faster sweep for more movement
        )
        .gain(AUDIO_CONFIG.gain.veryHigh)
        .color(plaidColors[1]),

      // Layer 3: Octave-layered lead melody
      n("0 7 9 12 7 9 4 7, [0 12] [7 19] [9 21] [12 24]")
        .scale("C5:minor")
        .s("triangle")
        .room(AUDIO_CONFIG.room.medium)
        .delay(0.3)
        .delaytime(AUDIO_CONFIG.delays.short) // Fast delay for rhythm
        .gain(AUDIO_CONFIG.gain.high)
        .color(plaidColors[2]),

      // Layer 4: Extended chord voicings for richness
      n(MUSICAL_PATTERNS.chords.extended)
        .scale("C4:minor")
        .s("supersaw")
        .lpf(AUDIO_CONFIG.filters.midHigh)
        .gain(AUDIO_CONFIG.gain.medium)
        .room(AUDIO_CONFIG.room.large)
        .color(plaidColors[3]),

      // Layer 5: High melody accent - adds brightness
      n("12 ~ 19 21 ~ 19 16 12")
        .scale("C6:minor")
        .s("square")                    // Square wave for bright, digital sound
        .lpf(AUDIO_CONFIG.filters.veryHigh)
        .gain(AUDIO_CONFIG.gain.low)
        .delay(0.5)
        .delaytime(AUDIO_CONFIG.delays.long)
        .color(plaidColors[4])
    );
  }

  /**
   * Pre-drop section (2 bars)
   * Tension-building section before the drop. Increases rhythmic density
   * to create anticipation.
   *
   * @returns {Pattern} Strudel pattern for pre-drop
   */
  predrop() {
    return stack(
      // Clap build-up: Rhythmic acceleration
      // "~ ~ ~ cp" → "~ ~ ~ [cp cp]" → "~ ~ ~ [~ [cp cp cp]]"
      s("~ ~ ~ cp, ~ ~ ~ [cp cp], ~ ~ ~ [~ [cp cp cp]]")
        .bank(AUDIO_CONFIG.drums.bank)
        .gain(AUDIO_CONFIG.gain.loud)
        .room(AUDIO_CONFIG.room.medium)
        .color(plaidColors[0]),

      // Hi-hat roll accelerates
      s("~ ~ hh*8 hh*16")
        .gain(AUDIO_CONFIG.gain.medium)
        .hpf(AUDIO_CONFIG.filters.veryHigh) // High-pass filter for thin sound
        .color(plaidColors[1]),

      // Tension note: Sustained root note
      n("0!16")                         // "!" repeats the note 16 times
        .scale("C2:minor")
        .s("supersaw")
        .lpf(AUDIO_CONFIG.filters.veryLow) // Heavy filtering creates tension
        .gain(AUDIO_CONFIG.gain.high)
        .color(plaidColors[2])
    );
  }

  /**
   * Drop section (8 bars)
   * The payoff after the predrop. Maximum energy with all elements.
   * Similar to climax but with different drum pattern.
   *
   * @returns {Pattern} Strudel pattern for drop
   */
  drop() {
    return stack(
      // Heavy drum pattern
      s("bd!4, sd*4, hh*8, cp*2")      // "!" = repeat 4 times per bar
        .bank(AUDIO_CONFIG.drums.bank)
        .room(AUDIO_CONFIG.room.small)
        .gain(AUDIO_CONFIG.gain.drop)   // Maximum gain
        .color(plaidColors[0]),

      // Powerful bass pattern
      n(MUSICAL_PATTERNS.bass.drop)
        .scale("C1:minor")              // Lowest octave for maximum bass
        .s("supersaw")
        .lpf(
          sine.range(AUDIO_CONFIG.filters.low, AUDIO_CONFIG.filters.veryHigh)
            .fast(2)
        )
        .gain(AUDIO_CONFIG.gain.loud)
        .color(plaidColors[1]),

      // Lead melody with delay
      n(MUSICAL_PATTERNS.melodies.chorus)
        .scale("C5:minor")
        .s("triangle")
        .room(AUDIO_CONFIG.room.large)
        .delay(0.3)
        .delaytime(AUDIO_CONFIG.delays.medium)
        .gain(AUDIO_CONFIG.gain.veryHigh)
        .color(plaidColors[2]),

      // Pad layer
      n(MUSICAL_PATTERNS.chords.extended)
        .scale("C4:minor")
        .s("supersaw")
        .lpf(AUDIO_CONFIG.filters.high)
        .gain(AUDIO_CONFIG.gain.medium)
        .room(AUDIO_CONFIG.room.medium)
        .color(plaidColors[3])
    );
  }

  /**
   * Outro section (4 bars)
   * Winds down the track with descending melody and minimal drums.
   * Provides a satisfying resolution.
   *
   * @returns {Pattern} Strudel pattern for outro
   */
  outro() {
    return stack(
      // Single kick drum fading out
      s("bd ~ ~ ~"),

      // Descending melody resolves to tonic
      n(MUSICAL_PATTERNS.melodies.outro)
        .scale("C5:minor")
        .s("triangle")
        .room(AUDIO_CONFIG.room.cathedral) // Maximum reverb for tail
        .gain(AUDIO_CONFIG.gain.quiet)
        .slow(2)                        // Slow and peaceful
    ).color(plaidColors[2]);
  }

  /**
   * Main play method - Sequences all sections into complete arrangement.
   *
   * Structure:
   * - intro (4 bars)
   * - verse (4 bars)
   * - chorus (8 bars)
   * - bridge (4 bars)
   * - verse (4 bars)
   * - chorus (8 bars)
   * - predrop (2 bars)
   * - drop (8 bars)
   * - climax (4 bars)
   * - verse (4 bars)
   * - chorus (4 bars)
   * - bridge (2 bars)
   * - outro (4 bars)
   *
   * Total: ~60 bars
   *
   * @returns {Pattern} Complete arranged track
   */
  play() {
    return "<intro@4 verse@4 chorus@8 bridge@4 verse@4 chorus@8 predrop@2 drop@8 climax@4 verse@4 chorus@4 bridge@2 outro@4>"
      .pickRestart({
        // Map section names to their patterns
        intro: this.intro(),
        verse: this.verse(),
        chorus: this.chorus(),
        bridge: this.bridge(),
        climax: this.climax(),
        predrop: this.predrop(),
        drop: this.drop(),
        outro: this.outro(),
      })
      // Set tempo: 140 BPM divided by 4 = 35 CPM (cycles per minute)
      // This is because each cycle represents 4 beats in Strudel
      .cpm(AUDIO_CONFIG.bpm / AUDIO_CONFIG.cpmDivider)
      .pianoroll(); // Enable piano roll visualization
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Create instance and start playback
const electroStack = new ElectroStack();
electroStack.play();
