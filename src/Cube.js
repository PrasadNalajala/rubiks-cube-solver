

class Cube {
  constructor() {
    this.faces = {
      U: Array(9).fill('w'), // white
      D: Array(9).fill('y'), // yellow
      F: Array(9).fill('g'), // green
      B: Array(9).fill('b'), // blue
      L: Array(9).fill('o'), // orange
      R: Array(9).fill('r'), // red
    };
  }
  static rotateFaceCW(face) {
    return [
      face[6], face[3], face[0],
      face[7], face[4], face[1],
      face[8], face[5], face[2],
    ];
  }

  // Helper to rotate a face 90° counterclockwise
  static rotateFaceCCW(face) {
    return [
      face[2], face[5], face[8],
      face[1], face[4], face[7],
      face[0], face[3], face[6],
    ];
  }

  // Rotate U (up) face clockwise
  rotateU() {
    this.faces.U = Cube.rotateFaceCW(this.faces.U);
    // Adjacent faces: F, R, B, L (top rows)
    const { F, R, B, L } = this.faces;
    const temp = F.slice(0, 3);
    this.faces.F[0] = R[0]; this.faces.F[1] = R[1]; this.faces.F[2] = R[2];
    this.faces.R[0] = B[0]; this.faces.R[1] = B[1]; this.faces.R[2] = B[2];
    this.faces.B[0] = L[0]; this.faces.B[1] = L[1]; this.faces.B[2] = L[2];
    this.faces.L[0] = temp[0]; this.faces.L[1] = temp[1]; this.faces.L[2] = temp[2];
  }

  // Rotate D (down) face clockwise
  rotateD() {
    this.faces.D = Cube.rotateFaceCW(this.faces.D);
    // Adjacent faces: F, L, B, R (bottom rows)
    const { F, R, B, L } = this.faces;
    const temp = F.slice(6, 9);
    this.faces.F[6] = L[6]; this.faces.F[7] = L[7]; this.faces.F[8] = L[8];
    this.faces.L[6] = B[6]; this.faces.L[7] = B[7]; this.faces.L[8] = B[8];
    this.faces.B[6] = R[6]; this.faces.B[7] = R[7]; this.faces.B[8] = R[8];
    this.faces.R[6] = temp[0]; this.faces.R[7] = temp[1]; this.faces.R[8] = temp[2];
  }

  // Rotate F (front) face clockwise
  rotateF() {
    this.faces.F = Cube.rotateFaceCW(this.faces.F);
    // Adjacent faces: U, R, D, L (bottom/top rows and columns)
    const { U, R, D, L } = this.faces;
    const temp = [U[6], U[7], U[8]];
    this.faces.U[6] = L[8]; this.faces.U[7] = L[5]; this.faces.U[8] = L[2];
    this.faces.L[2] = D[2]; this.faces.L[5] = D[1]; this.faces.L[8] = D[0];
    this.faces.D[0] = R[6]; this.faces.D[1] = R[3]; this.faces.D[2] = R[0];
    this.faces.R[0] = temp[2]; this.faces.R[3] = temp[1]; this.faces.R[6] = temp[0];
  }

  // Rotate B (back) face clockwise
  rotateB() {
    this.faces.B = Cube.rotateFaceCW(this.faces.B);
    // Adjacent faces: U, L, D, R (top/bottom rows and columns)
    const { U, R, D, L } = this.faces;
    const temp = [U[0], U[1], U[2]];
    this.faces.U[0] = R[2]; this.faces.U[1] = R[5]; this.faces.U[2] = R[8];
    this.faces.R[2] = D[8]; this.faces.R[5] = D[7]; this.faces.R[8] = D[6];
    this.faces.D[6] = L[0]; this.faces.D[7] = L[3]; this.faces.D[8] = L[6];
    this.faces.L[0] = temp[2]; this.faces.L[3] = temp[1]; this.faces.L[6] = temp[0];
  }

  // Rotate L (left) face clockwise
  rotateL() {
    this.faces.L = Cube.rotateFaceCW(this.faces.L);
    // Adjacent faces: U, F, D, B (left columns)
    const { U, F, D, B } = this.faces;
    const temp = [U[0], U[3], U[6]];
    this.faces.U[0] = B[8]; this.faces.U[3] = B[5]; this.faces.U[6] = B[2];
    this.faces.B[2] = D[6]; this.faces.B[5] = D[3]; this.faces.B[8] = D[0];
    this.faces.D[0] = F[0]; this.faces.D[3] = F[3]; this.faces.D[6] = F[6];
    this.faces.F[0] = temp[0]; this.faces.F[3] = temp[1]; this.faces.F[6] = temp[2];
  }

  // Rotate R (right) face clockwise
  rotateR() {
    this.faces.R = Cube.rotateFaceCW(this.faces.R);
    // Adjacent faces: U, B, D, F (right columns)
    const { U, F, D, B } = this.faces;
    const temp = [U[2], U[5], U[8]];
    this.faces.U[2] = F[2]; this.faces.U[5] = F[5]; this.faces.U[8] = F[8];
    this.faces.F[2] = D[2]; this.faces.F[5] = D[5]; this.faces.F[8] = D[8];
    this.faces.D[2] = B[6]; this.faces.D[5] = B[3]; this.faces.D[8] = B[0];
    this.faces.B[0] = temp[2]; this.faces.B[3] = temp[1]; this.faces.B[6] = temp[0];
  }

  // Rotate U (up) face counterclockwise
  rotateUPrime() {
    this.rotateU(); this.rotateU(); this.rotateU();
  }

  // Rotate D (down) face counterclockwise
  rotateDPrime() {
    this.rotateD(); this.rotateD(); this.rotateD();
  }

  // Rotate F (front) face counterclockwise
  rotateFPrime() {
    this.rotateF(); this.rotateF(); this.rotateF();
  }

  // Rotate B (back) face counterclockwise
  rotateBPrime() {
    this.rotateB(); this.rotateB(); this.rotateB();
  }

  // Rotate L (left) face counterclockwise
  rotateLPrime() {
    this.rotateL(); this.rotateL(); this.rotateL();
  }

  // Rotate R (right) face counterclockwise
  rotateRPrime() {
    this.rotateR(); this.rotateR(); this.rotateR();
  }

  // Perform a move by notation (e.g., 'U', "U'", 'D', etc.)
  move(notation) {
    switch (notation) {
      case 'U': this.rotateU(); break;
      case "U'": this.rotateUPrime(); break;
      case 'D': this.rotateD(); break;
      case "D'": this.rotateDPrime(); break;
      case 'F': this.rotateF(); break;
      case "F'": this.rotateFPrime(); break;
      case 'B': this.rotateB(); break;
      case "B'": this.rotateBPrime(); break;
      case 'L': this.rotateL(); break;
      case "L'": this.rotateLPrime(); break;
      case 'R': this.rotateR(); break;
      case "R'": this.rotateRPrime(); break;
      default: throw new Error('Invalid move notation: ' + notation);
    }
  }

  // Get a string representation for getCubeSvg()
  getColorString() {
    // Order: U, R, F, D, L, B
    return (
      this.faces.U.join('') +
      this.faces.R.join('') +
      this.faces.F.join('') +
      this.faces.D.join('') +
      this.faces.L.join('') +
      this.faces.B.join('')
    );
  }
}

export default Cube; 