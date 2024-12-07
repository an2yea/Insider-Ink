
// Auto Generated File.
// Created using Reputation CLI from True Network.
// To update the classes, use the "reputation-cli acm-prepare" at the root directory that contains "true-network".

@inline
function readMemory<T>(index: usize): T {
  return load<T>(index);
}


class WHISTLESCHEMA {
  sentimentScore: u16;
  currentReputation: u16;

  constructor() {
    this.sentimentScore = readMemory<u16>(0);
    this.currentReputation = readMemory<u16>(2);
  }
}


export class Attestations {
  static whistleSchema: WHISTLESCHEMA = new WHISTLESCHEMA();
}
