// @title They've Gone Plaid
// @by nukleas
const plaidColors = ["#FFD700", "#FFA500", "#DC143C", "#8B0000", "#ffffff"];
class ElectroStack {
  intro() {
    return stack(s("bd ~ ~ ~, ~ ~ hh ~"));
  }
  verse() {
    return stack(
      s("bd*<1 2 4 8>, hh*<4 8 16 32>").bank("RolandTR909"),
      n("0 2 4 7 9 7 4 2").scale("C5:minor").s("triangle").room(0.3).gain(0.5)
    );
  }
  chorus() {
    return stack(
      s("[bd sd]*2, hh*8, [~ cp]*2")
        .bank("RolandTR909")
        .room(0.2)
        .color(plaidColors[0]),
      n("0 -5 0 -3 0 -5 -7 -5")
        .scale("C2:minor")
        .s("supersaw")
        .lpf(sine.range(400, 2000).slow(4))
        .gain(0.6)
        .color(plaidColors[1]),
      n("0 ~ 7 9 ~ 7 4 0, ~ 3 ~ 5 7 ~ 9 7")
        .scale("C5:minor")
        .s("triangle")
        .room(0.5)
        .delay(0.25)
        .delaytime(0.125)
        .color(plaidColors[2])
        .sometimes((x) => x.rev())
        .every(4, (x) => x.add(12)),
      n("<[0,3,7] [5,8,12] [-2,2,5] [-5,-2,2]>")
        .scale("C4:minor")
        .s("supersaw")
        .lpf(800)
        .gain(0.3)
        .room(0.7)
        .slow(2)
        .color(plaidColors[3])
    );
  }
  bridge() {
    return stack(
      s("~ ~ sd ~, hh hh ~ ~").color(plaidColors[0]),
      n("~ 0 ~ 3 ~ 4 ~ 7")
        .scale("C6:minor")
        .s("sine")
        .room(0.7)
        .gain(0.4)
        .slow(2),
      n("<[0,3,7] [5,8,12] [-2,2,5] [-5,-2,2]>")
        .scale("C4:minor")
        .s("supersaw")
        .lpf(800)
        .gain(0.3)
        .room(0.7)
        .slow(2)
    );
  }
  climax() {
    return stack(
      s("[bd bd]*2, sd*4, hh*16, [cp ~]*4")
        .bank("RolandTR909")
        .room(0.3)
        .gain(1.1)
        .color(plaidColors[0]),
      n("0 0 -5 -5 0 0 -3 -7")
        .scale("C2:minor")
        .s("supersaw")
        .lpf(sine.range(800, 3000).fast(2))
        .gain(0.8)
        .color(plaidColors[1]),
      n("0 7 9 12 7 9 4 7, [0 12] [7 19] [9 21] [12 24]")
        .scale("C5:minor")
        .s("triangle")
        .room(0.4)
        .delay(0.3)
        .delaytime(0.0625)
        .gain(0.7)
        .color(plaidColors[2]),
      n("<[0,3,7,12] [5,8,12,17] [-2,2,5,10] [-5,-2,2,7]>")
        .scale("C4:minor")
        .s("supersaw")
        .lpf(1200)
        .gain(0.5)
        .room(0.5)
        .color(plaidColors[3]),
      n("12 ~ 19 21 ~ 19 16 12")
        .scale("C6:minor")
        .s("square")
        .lpf(2000)
        .gain(0.4)
        .delay(0.5)
        .delaytime(0.25)
        .color(plaidColors[4])
    );
  }
  predrop() {
    return stack(
      s("~ ~ ~ cp, ~ ~ ~ [cp cp], ~ ~ ~ [~ [cp cp cp]]")
        .bank("RolandTR909")
        .gain(0.9)
        .room(0.4)
        .color(plaidColors[0]),
      s("~ ~ hh*8 hh*16").gain(0.5).hpf(2000).color(plaidColors[1]),
      n("0!16")
        .scale("C2:minor")
        .s("supersaw")
        .lpf(400)
        .gain(0.7)
        .color(plaidColors[2])
    );
  }
  drop() {
    return stack(
      s("bd!4, sd*4, hh*8, cp*2")
        .bank("RolandTR909")
        .room(0.3)
        .gain(1.2)
        .color(plaidColors[0]),
      n("0 0 -5 -3")
        .scale("C1:minor")
        .s("supersaw")
        .lpf(sine.range(600, 2500).fast(2))
        .gain(0.9)
        .color(plaidColors[1]),
      n("0 ~ 7 9 ~ 7 4 0, ~ 3 ~ 5 7 ~ 9 7")
        .scale("C5:minor")
        .s("triangle")
        .room(0.5)
        .delay(0.3)
        .delaytime(0.125)
        .gain(0.8)
        .color(plaidColors[2]),
      n("<[0,3,7,12] [5,8,12,17] [-2,2,5,10] [-5,-2,2,7]>")
        .scale("C4:minor")
        .s("supersaw")
        .lpf(1500)
        .gain(0.5)
        .room(0.4)
        .color(plaidColors[3])
    );
  }
  outro() {
    return stack(
      s("bd ~ ~ ~"),
      n("9 7 4 2 0 ~ ~ ~")
        .scale("C5:minor")
        .s("triangle")
        .room(0.8)
        .gain(0.3)
        .slow(2)
    ).color(plaidColors[2]);
  }
  play() {
    return "<intro@4 verse@4 chorus@8 bridge@4 verse@4 chorus@8 predrop@2 drop@8 climax@4 verse@4 chorus@4 bridge@2 outro@4>"
      .pickRestart({
        intro: this.intro(),
        verse: this.verse(),
        chorus: this.chorus(),
        bridge: this.bridge(),
        climax: this.climax(),
        predrop: this.predrop(),
        drop: this.drop(),
        outro: this.outro(),
      })
      .cpm(140 / 4)
      .pianoroll();
  }
}
const electroStack = new ElectroStack();
electroStack.play();
