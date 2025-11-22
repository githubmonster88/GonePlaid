# They've Gone Plaid 🎵

An electronic music composition created with [Strudel](https://strudel.cc), a live coding environment for algorithmic music.

## Overview

"They've Gone Plaid" is a C minor electronic track featuring:
- 🥁 Roland TR-909 drum machine samples
- 🎹 Multiple synthesizer layers (triangle, supersaw, sine, square)
- 🎚️ Dynamic effects (reverb, delay, filters)
- 🎨 Visual color-coding for different frequency ranges
- 📐 Structured arrangement following traditional song form

**Key**: C Minor
**BPM**: 140
**Duration**: ~60 bars
**Author**: nukleas

## Files

- **`theyve-gone-plaid.js`** - Original code from strudel.cc
- **`theyve-gone-plaid-improved.js`** - Documented and improved version
- **`CODE_REVIEW.md`** - Detailed code review and analysis

## Quick Start

### Option 1: Run in Strudel Web Editor

1. Visit [strudel.cc](https://strudel.cc)
2. Copy the contents of either JavaScript file
3. Paste into the editor
4. Press **Play** (or Ctrl+Enter)

### Option 2: Use the Original Link

Visit the original composition:
[https://strudel.cc/...](https://strudel.cc) (shortened link in source)

## Code Structure

The composition is organized as a JavaScript class with methods for each section:

```javascript
class ElectroStack {
  intro()    // 4 bars - Minimal drums
  verse()    // 4 bars - Introduces melody
  chorus()   // 8 bars - Full arrangement (main hook)
  bridge()   // 4 bars - Breakdown section
  climax()   // 4 bars - Maximum energy
  predrop()  // 2 bars - Tension builder
  drop()     // 8 bars - Payoff section
  outro()    // 4 bars - Wind down
  play()     // Sequences all sections
}
```

## Musical Elements

### Layers

Each section uses `stack()` to combine multiple layers:

1. **🥁 Drums** - Kick, snare, hi-hat, clap (Roland TR-909)
2. **🔊 Bass** - Low-frequency supersaw synthesizer
3. **🎼 Lead** - Melodic triangle/sine waves
4. **🌊 Pad** - Atmospheric chord progressions
5. **✨ Accents** - High-frequency elements for brightness

### Chord Progression

The track uses a progression in C minor:
- **i** (C minor): [0, 3, 7]
- **VI** (A♭ major): [5, 8, 12]
- **iv** (F minor): [-2, 2, 5]
- **VII** (B♭ major): [-5, -2, 2]

### Effects Chain

- **Reverb** (.room) - Spatial depth
- **Delay** (.delay, .delaytime) - Rhythmic echoes
- **Low-pass filter** (.lpf) - Removes high frequencies
- **High-pass filter** (.hpf) - Removes low frequencies
- **Dynamic filters** - Sweeping effects using sine waves

## Improvements in Enhanced Version

The improved version (`theyve-gone-plaid-improved.js`) includes:

✅ **Comprehensive Documentation**
- JSDoc comments for all classes and methods
- Inline explanations of musical decisions
- Parameter descriptions

✅ **Configuration Management**
- Extracted all magic numbers to named constants
- `AUDIO_CONFIG` object for all audio parameters
- `MUSICAL_PATTERNS` object for reusable patterns

✅ **Better Code Organization**
- Separated configuration from logic
- Consistent formatting and style
- Improved readability

✅ **Enhanced Maintainability**
- Easy to modify BPM, gain, filters, etc.
- Reusable chord progressions and melodies
- Better comments explaining "why" not just "what"

## Customization

### Change the Tempo

```javascript
const AUDIO_CONFIG = {
  bpm: 128, // Change from 140 to 128
  // ...
};
```

### Modify the Key

Change all `.scale()` calls from `"C5:minor"` to your desired key:

```javascript
.scale("D5:minor")  // D minor
.scale("E5:major")  // E major
.scale("G5:dorian") // G dorian
```

### Adjust Mix Levels

Modify gain values in `AUDIO_CONFIG.gain`:

```javascript
const AUDIO_CONFIG = {
  gain: {
    quiet: 0.2,  // Make pads quieter
    medium: 0.6, // Boost lead melody
    // ...
  }
};
```

### Change Colors

Modify the `plaidColors` array:

```javascript
const plaidColors = [
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  // ...
];
```

## Strudel Syntax Reference

### Pattern Notation

- `~` - Rest/silence
- `*N` - Repeat N times per cycle
- `!N` - Repeat note N times
- `[a b]` - Group elements
- `<a b>` - Alternate between elements per cycle
- `,` - Play patterns in parallel

### Functions

- `s()` - Sample/sound selector
- `n()` - Note/number pattern
- `stack()` - Layer multiple patterns
- `.scale()` - Map numbers to musical scale
- `.bank()` - Select sample bank
- `.gain()` - Volume (0.0 to 1.0+)
- `.room()` - Reverb amount
- `.lpf()` - Low-pass filter
- `.hpf()` - High-pass filter
- `.delay()` - Delay mix
- `.delaytime()` - Delay time in beats

### Modifiers

- `.slow(N)` - Slow pattern by N
- `.fast(N)` - Speed up pattern by N
- `.sometimes(fn)` - Randomly apply function
- `.every(N, fn)` - Apply function every N cycles
- `.rev()` - Reverse pattern
- `.add(N)` - Transpose by N semitones

## Learning Resources

- [Strudel Documentation](https://strudel.cc/learn/)
- [Strudel Tutorial](https://strudel.cc/tutorial/)
- [Live Coding Patterns](https://tidalcycles.org/docs/patternlib/tutorials/workshop)

## Contributing

Feel free to:
- Create variations of this composition
- Experiment with different parameters
- Share your remixes
- Report issues or suggest improvements

## License

This code is provided as-is for educational and creative purposes.

## Credits

- **Original Composition**: nukleas
- **Platform**: Strudel (https://strudel.cc)
- **Samples**: Roland TR-909 drum machine
- **Documentation & Improvements**: Code review and enhancement

---

**Enjoy the music!** 🎶

For questions or to share your creations, visit the [Strudel Discord](https://discord.gg/strudel)
