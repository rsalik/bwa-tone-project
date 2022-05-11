import * as Tone from 'tone';

export const MACHINE_LENGTH = 16;
export const NOTES = ['C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5'];

export let notes = {} as { [key: string]: boolean[] };

const synth = new Tone.PolySynth().toDestination();

let playing = false;

export async function start(callback?: Function) {
  if (playing) {
    console.log('stop');
    Tone.Transport.cancel(0);
    Tone.Transport.stop();
    playing = false;

    callback?.(-1);

    return;
  }

  await Tone.start();

  let i = 0;
  const part = new Tone.Loop((time) => {
    Object.keys(notes).forEach((note) => {
      if (notes[note][i]) synth.triggerAttackRelease(note, '8n', Tone.now());
    });
    callback?.(i);

    i++;
    i %= MACHINE_LENGTH;
  }, '8n');
  part.start(0);

  Tone.Transport.start();
  playing = true;
}

function initNotes(arr: string[]) {
  notes = {};
  arr.forEach((note) => {
    notes[note] = Array(MACHINE_LENGTH).fill(false);
  });
}

initNotes(NOTES);

export function toggleNote(note: string, position: number) {
  if (!notes[note]) {
    notes[note] = [];
  }

  notes[note][position] = !notes[note][position];
}
