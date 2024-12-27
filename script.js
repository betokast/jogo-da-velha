class Jogador {
  constructor(simbolo) {
    this.simbolo = simbolo;
  }
}

class Jogada {
  constructor(linha, coluna) {
    this.linha = linha;
    this.coluna = coluna;
  }
  get valida() {
    return this.linha > 0 && this.coluna > 0;
  }
  get invalida() {
    return !this.valida;
  }
}

// class JogoDaVelha {
//     constructor(jogador1 = new Jogador("X"), jogador2 = new Jogador("O")){
//         this.jogador1 = jogador1;
//         this.jogador2 = jogador2;
//         this.jogadorAtual = jogador1;
//         this.tamanho = 3;
//         this.tabuleiro = this.#iniciarTabuleiro();
//         this.vencedor = null;
//     }

//     #iniciarTabuleiro(){
//         return Array(this.tamanho).fill(0).map(()=> Array(this.tamanho).fill(null));
//     }

//     // jogar(jogada){
//     //     this.#processarJogada(jogada);
//     // }
//     jogar(jogada) {
//         if (this.#jogadaValidada(jogada)) {
//             this.#adicionar(jogada);
//             if (this.#verificarVencedor()) {
//                 console.log(`Vencedor: ${this.jogadorAtual.simbolo}`);
//                 this.vencedor = this.jogadorAtual;
//             } else {
//                 this.#trocarJogador();
//             }
//         } else {
//             console.log("Jogada inválida");
//         }
//     }

//     #processarJogada(jogada){
//         if(!this.#jogadaValidada(jogada)) return;

//         this.#adicionar(jogada);
//         if(this.#conquistouVitoriaComJogada(jogada)){
//             this.vencedor = this.jogadorAtual.simbolo;
//             return;
//         } else if(this.#finalizouComEmpate) {
//             this.vencedor = "-"
//             return;
//         }
//         this.#trocarJogador();
//     }

//     #jogadaValidada(jogada){
//         if(jogada.invalida){
//             return false;
//         } else {
//             let { linha, coluna } = jogada;
//             if(linha > this.tamanho || coluna > this.tamanho){
//                 return false;
//             }
//         }
//         if(this.#ocupado(jogada)){
//             return false;
//         }
//         if(this.vencedor){
//             return false;
//         }
//         return true;
//     }

//     #ocupado(jogada){
//         let { linha, coluna } = jogada;
//         return this.#campo(linha, coluna) !== null;
//     }

//     #campo(linha, coluna){
//         return this.tabuleiro[linha - 1][coluna - 1];
//     }

//     #trocarJogador(){
//         this.jogadorAtual = this.jogadorAtual.simbolo === this.jogador1.simbolo ? this.jogador2 : this.jogador1;
//     }

//     #adicionar(jogada){
//         let { linha, coluna } = jogada;
//         this.tabuleiro[linha - 1][coluna - 1] = this.jogadorAtual.simbolo;;
//     }

//     #verificarVencedor() {
//         const simbolo = this.jogadorAtual.simbolo;

//         // Verificar linhas
//         for (let i = 0; i < this.tamanho; i++) {
//             if (this.tabuleiro[i].every((campo) => campo === simbolo)) {
//                 return true;
//             }
//         }

//         // Verificar colunas
//         for (let j = 0; j < this.tamanho; j++) {
//             if (this.tabuleiro.every((linha) => linha[j] === simbolo)) {
//                 return true;
//             }
//         }

//         // Verificar diagonal principal
//         if (this.tabuleiro.every((linha, index) => linha[index] === simbolo)) {
//             return true;
//         }

//         // Verificar diagonal secundária
//         if (this.tabuleiro.every((linha, index) => linha[this.tamanho - 1 - index] === simbolo)) {
//             return true;
//         }

//         return false;
//     }

//     #finalizouComEmpate(){
//         let espacosVazios = this.tabuleiro.flat().filter((campo) => campo === null);
//         return espacosVazios.length === 0;
//     }

//     #conquistouVitoriaComJogada(jogada){
//         let { linha, coluna } = jogada;
//         let { tabuleiro, jogadorAtual } = this;
//         let tamanho = tabuleiro.length;
//         let indices = Array(tamanho).fill(0).map((_,i) => i + 1);
//         let ganhouEmLinha = indices.every((i) => this.#campo(linha, i) === jogadorAtual.simbolo);
//         let ganhouEmColuna = indices.every((i) => {
//             this.#campo(i, coluna) === jogadorAtual.simbolo;
//         })
//         let ganhouEmDiagonal1 = indices.every((i) => {
//             this.#campo(i,i) === jogadorAtual.simbolo;
//         })
//         let ganhouEmDiagonal2 = indices.every((i) => {
//             this.#campo(tamanho - i + 1,i) === jogadorAtual.simbolo;
//         })

//         return ganhouEmLinha || ganhouEmColuna || ganhouEmDiagonal1 || ganhouEmDiagonal2;
//     }

//     toString(){
//         let matriz = this.tabuleiro.map((linha) => linha.map((posicao)=> posicao ?? "-").join(" ")).join("\n");
//         return `${matriz} \n Vencedor: ${this.vencedor}`;
//     }
// }

// const jogo = new JogoDaVelha();
// jogo.jogar(new Jogada(1,1));
// jogo.jogar(new Jogada(1,2));
// jogo.jogar(new Jogada(1,3));
// jogo.jogar(new Jogada(2,1));
// jogo.jogar(new Jogada(2,2));
// jogo.jogar(new Jogada(2,3));
// jogo.jogar(new Jogada(3,1));
// jogo.jogar(new Jogada(3,2));
// jogo.jogar(new Jogada(3,3));
// console.log(jogo.toString());

class JogoDaVelha {
  constructor(jogador1 = new Jogador("X"), jogador2 = new Jogador("O")) {
    this.jogador1 = jogador1;
    this.jogador2 = jogador2;
    this.jogadorAtual = jogador1;
    this.tamanho = 3;
    this.tabuleiro = this.#iniciarTabuleiro();
    this.vencedor = null;
  }

  #iniciarTabuleiro() {
    return Array(this.tamanho)
      .fill(0)
      .map(() => Array(this.tamanho).fill(null));
  }

  jogar(jogada) {
    if (this.#jogadaValidada(jogada)) {
      this.#adicionar(jogada);
      if (this.#verificarVencedor()) {
        console.log(`Vencedor: ${this.jogadorAtual.simbolo}`);
        this.vencedor = this.jogadorAtual;
      } else {
        this.#trocarJogador();
      }
    } else {
      console.log("Jogada inválida");
    }
  }

  #jogadaValidada(jogada) {
    if (jogada.invalida) {
      return false;
    }
    let { linha, coluna } = jogada;
    if (linha > this.tamanho || coluna > this.tamanho) {
      return false;
    }
    if (this.#ocupado(jogada)) {
      return false;
    }
    if (this.vencedor) {
      return false;
    }
    return true;
  }

  #ocupado(jogada) {
    let { linha, coluna } = jogada;
    return this.#campo(linha, coluna) !== null;
  }

  #campo(linha, coluna) {
    return this.tabuleiro[linha - 1][coluna - 1];
  }

  #trocarJogador() {
    this.jogadorAtual =
      this.jogadorAtual.simbolo === this.jogador1.simbolo
        ? this.jogador2
        : this.jogador1;
  }

  #adicionar(jogada) {
    let { linha, coluna } = jogada;
    this.tabuleiro[linha - 1][coluna - 1] = this.jogadorAtual.simbolo;
  }

  #verificarVencedor() {
    const simbolo = this.jogadorAtual.simbolo;

    // Verificar linhas
    for (let i = 0; i < this.tamanho; i++) {
      if (this.tabuleiro[i].every((campo) => campo === simbolo)) {
        return true;
      }
    }

    // Verificar colunas
    for (let j = 0; j < this.tamanho; j++) {
      if (this.tabuleiro.every((linha) => linha[j] === simbolo)) {
        return true;
      }
    }

    // Verificar diagonal principal
    if (this.tabuleiro.every((linha, index) => linha[index] === simbolo)) {
      return true;
    }

    // Verificar diagonal secundária
    if (
      this.tabuleiro.every(
        (linha, index) => linha[this.tamanho - 1 - index] === simbolo
      )
    ) {
      return true;
    }

    return false;
  }

  toString() {
    let matriz = this.tabuleiro
      .map((linha) => linha.map((posicao) => posicao ?? "-").join(" "))
      .join("\n");
    //   let quemVenceu = this.vencedor ? `Vencedor: ${this.vencedor}` : ""
    return `${matriz} \n`;
  }
}

// Testando o código atualizado
const jogo = new JogoDaVelha();
// jogo.jogar(new Jogada(1, 1)); // Jogador X joga na posição (1,1)
// jogo.jogar(new Jogada(1, 2)); // Jogador O joga na posição (1,2)
// jogo.jogar(new Jogada(2, 2)); // Jogador X joga na posição (2,2)
// jogo.jogar(new Jogada(2, 1)); // Jogador O joga na posição (2,1)
// jogo.jogar(new Jogada(3, 3)); // Jogador X joga na posição (3,3) -> X vence (diagonal)
jogo.jogar(new Jogada(1, 1));
jogo.jogar(new Jogada(2, 2));
jogo.jogar(new Jogada(1, 3));
jogo.jogar(new Jogada(1, 2));
jogo.jogar(new Jogada(3, 1));
jogo.jogar(new Jogada(2, 1));
jogo.jogar(new Jogada(3, 1));
jogo.jogar(new Jogada(2, 3));
jogo.jogar(new Jogada(3, 2));

console.log(jogo.toString());
