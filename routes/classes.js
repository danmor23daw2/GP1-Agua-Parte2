class Agua {
  constructor(name) {
    this.name = name;
  }

  gasto() {
    return `${this.name} ha malgastado`;
  }
}

class Campo extends Agua {
  gasto() {
    return `${this.name} ha malgastado.`;
  }
}

class Impacto extends Agua {
  gasto() {
    return `${this.name} se ha perdido.`;
  }
}

module.exports = { Campo, Impacto };
