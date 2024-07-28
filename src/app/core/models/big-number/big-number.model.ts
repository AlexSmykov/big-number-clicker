export class BigNumber {
  // Глубина степени. Обычная степень - 0
  depth = 0;

  currentValue: number;

  constructor(initValue: number = 0, degreeDepth: number = 0) {
    this.currentValue = initValue ?? 0;
    this.depth = degreeDepth ?? 0;

    this.updateDegree();
  }

  copy(): BigNumber {
    return new BigNumber(this.currentValue, this.depth);
  }

  private updateDegree(): void {
    if (this.currentValue === 0 && this.depth !== 0) {
      this.depth = 0;
    }

    if (this.currentValue >= 1e100) {
      this.depth++;
      this.currentValue = Math.log10(this.currentValue);
    }

    if (this.currentValue < 100 && this.depth >= 1) {
      this.depth--;
      this.currentValue = Math.pow(10, this.currentValue);

      this.updateDegree();
    }

    if (this.depth === -1) {
      this.currentValue = Math.log10(this.currentValue);
      this.depth = 0;
    }
  }

  plus(anotherNumber: BigNumber | number): BigNumber {
    if (typeof anotherNumber === 'number') {
      anotherNumber = new BigNumber(anotherNumber);
    }
    anotherNumber = anotherNumber.copy();

    if (anotherNumber.currentValue === 0) {
      return this;
    }

    const depthDiff = this.depth - anotherNumber.depth;

    if (depthDiff > 1) {
      return this;
    } else if (depthDiff === 1) {
      if (anotherNumber.depth > 1) {
        return this;
      }

      const logAnother = Math.log10(anotherNumber.currentValue);
      if (this.currentValue - logAnother < 10) {
        this.currentValue +=
          logAnother / Math.pow(10, this.currentValue - logAnother);
      }
    } else if (depthDiff === 0) {
      if (anotherNumber.depth > 1) {
        return this;
      }

      if (this.depth === 1) {
        const powerDiff = Math.abs(
          this.currentValue - anotherNumber.currentValue
        );
        if (powerDiff <= 10) {
          this.currentValue += Math.log10(1 + Math.pow(10, powerDiff));
        } else {
          this.currentValue = Math.max(
            this.currentValue,
            anotherNumber.currentValue
          );
        }
      } else {
        this.currentValue += anotherNumber.currentValue;
      }
    } else if (depthDiff === -1) {
      if (this.depth > 1) {
        return this;
      }

      const logThis = Math.log10(this.currentValue);
      if (anotherNumber.currentValue - logThis < 10) {
        this.currentValue =
          anotherNumber.currentValue +
          logThis / Math.pow(10, anotherNumber.currentValue - logThis);
        this.depth = anotherNumber.depth;
      } else {
        this.depth = anotherNumber.depth;
        this.currentValue = anotherNumber.currentValue;
      }
    } else if (depthDiff < -1) {
      this.depth = anotherNumber.depth;
      this.currentValue = anotherNumber.currentValue;
    }

    this.updateDegree();

    return this;
  }

  minus(anotherNumber: BigNumber | number): BigNumber {
    if (typeof anotherNumber === 'number') {
      anotherNumber = new BigNumber(anotherNumber);
    }
    anotherNumber = anotherNumber.copy();

    if (anotherNumber.currentValue === 0) {
      return this;
    }

    const depthDiff = this.depth - anotherNumber.depth;

    if (depthDiff > 1) {
      return this;
    } else if (depthDiff === 1) {
      if (anotherNumber.depth > 1) {
        return this;
      }

      const logAnother = Math.log10(anotherNumber.currentValue);
      if (this.currentValue - logAnother < 10) {
        this.currentValue -=
          logAnother / Math.pow(10, this.currentValue - logAnother);
      }
    } else if (depthDiff === 0) {
      if (anotherNumber.currentValue >= this.currentValue) {
        this.currentValue = 0;
        this.depth = 0;

        return this;
      }

      if (anotherNumber.depth > 1) {
        return this;
      }

      if (this.depth === 1) {
        const powerDiff = Math.abs(
          this.currentValue - anotherNumber.currentValue
        );
        if (powerDiff <= 10) {
          this.currentValue -= Math.log10(1 + 1 / Math.pow(10, powerDiff));
        }
      } else {
        this.currentValue -= anotherNumber.currentValue;
      }
    } else {
      this.currentValue = 0;
      this.depth = 0;

      return this;
    }

    this.updateDegree();

    return this;
  }

  multiply(anotherNumber: BigNumber | number): BigNumber {
    if (typeof anotherNumber === 'number') {
      anotherNumber = new BigNumber(anotherNumber);
    }
    anotherNumber = anotherNumber.copy();

    if (anotherNumber.depth === 0) {
      if (this.depth === 0) {
        this.currentValue *= anotherNumber.currentValue;
      } else {
        this.currentValue += Math.log10(anotherNumber.currentValue);
      }
    } else {
      if (this.depth === 0) {
        anotherNumber.currentValue += Math.log10(this.currentValue);

        this.currentValue = anotherNumber.currentValue;
        this.depth = anotherNumber.depth;
      } else {
        const res = new BigNumber(this.currentValue, this.depth - 1);
        res.plus(
          new BigNumber(anotherNumber.currentValue, anotherNumber.depth - 1)
        );
        this.currentValue = res.currentValue;
        this.depth = res.depth + 1;
      }
    }

    this.updateDegree();

    return this;
  }

  divide(anotherNumber: BigNumber | number): BigNumber {
    if (typeof anotherNumber === 'number') {
      anotherNumber = new BigNumber(anotherNumber);
    }
    anotherNumber = anotherNumber.copy();

    if (
      anotherNumber.depth === this.depth &&
      anotherNumber.currentValue === this.currentValue
    ) {
      this.currentValue = 1;
      this.depth = 0;
    } else if (anotherNumber.depth === 0) {
      if (this.depth === 0) {
        this.currentValue /= anotherNumber.currentValue;
      } else {
        this.currentValue -= Math.log10(anotherNumber.currentValue);
      }
    } else {
      if (this.depth === 0) {
        if (Math.log10(this.currentValue) + 10 < anotherNumber.currentValue) {
          this.currentValue = 0;
          this.depth = 0;

          return this;
        }

        this.currentValue /= Math.pow(10, anotherNumber.currentValue);
      } else {
        const res = new BigNumber(this.currentValue, this.depth - 1);
        res.minus(
          new BigNumber(anotherNumber.currentValue, anotherNumber.depth - 1)
        );
        this.currentValue = res.currentValue;
        this.depth = res.depth + 1;
      }
    }

    this.updateDegree();

    return this;
  }

  pow(anotherNumber: BigNumber | number): BigNumber {
    if (typeof anotherNumber === 'number') {
      anotherNumber = new BigNumber(anotherNumber);
    }
    anotherNumber = anotherNumber.copy();

    if (anotherNumber.currentValue === 1) {
      return this;
    }

    const newNumber = new BigNumber(Math.log10(this.currentValue), this.depth);
    newNumber.multiply(anotherNumber);

    this.currentValue = newNumber.currentValue;
    this.depth = newNumber.depth + 1;

    this.updateDegree();

    return this;
  }

  root(anotherNumber: BigNumber | number): BigNumber {
    if (typeof anotherNumber === 'number') {
      anotherNumber = new BigNumber(anotherNumber);
    }
    anotherNumber = anotherNumber.copy();

    if (
      anotherNumber.depth === this.depth &&
      anotherNumber.currentValue === this.currentValue &&
      anotherNumber.depth > 0
    ) {
      this.currentValue = 1;
      this.depth = 0;

      return this;
    }

    const newNumber = new BigNumber(Math.log10(this.currentValue), this.depth);
    newNumber.divide(anotherNumber);

    this.currentValue = newNumber.currentValue;
    this.depth = newNumber.depth + 1;

    this.updateDegree();
    return this;
  }

  log(base: BigNumber | number): BigNumber {
    if (typeof base === 'number') {
      base = new BigNumber(base);
    }
    base = base.copy();

    if (base.depth === 0) {
      if (this.depth === 0) {
        this.currentValue = logb(base, this);
      } else {
        this.depth--;
        this.multiply(logb(base, new BigNumber(10)));
      }
    } else {
      if (this.depth === 0) {
        if (base.depth === 1) {
          this.currentValue = Math.log10(this.currentValue) / base.currentValue;
        } else {
          this.currentValue = 0;
        }
      } else {
        this.depth--;
        base.depth--;
        this.divide(base);
      }
    }

    this.updateDegree();

    return this;
  }

  log10(): BigNumber {
    return this.log(10);
  }

  moreThan(anotherNumber: BigNumber | number): boolean {
    if (typeof anotherNumber === 'number') {
      anotherNumber = new BigNumber(anotherNumber);
    }

    if (this.depth === anotherNumber.depth) {
      return this.currentValue > anotherNumber.currentValue;
    }

    return this.depth > anotherNumber.depth;
  }

  moreThanOrEqual(anotherNumber: BigNumber | number): boolean {
    if (typeof anotherNumber === 'number') {
      anotherNumber = new BigNumber(anotherNumber);
    }

    if (this.depth === anotherNumber.depth) {
      return this.currentValue >= anotherNumber.currentValue;
    }

    return this.depth >= anotherNumber.depth;
  }

  isEqual(anotherNumber: any): boolean {
    if (typeof anotherNumber === 'number') {
      anotherNumber = new BigNumber(anotherNumber);
    }

    if (!(anotherNumber instanceof BigNumber)) {
      return false;
    }

    return (
      this.depth === anotherNumber.depth &&
      this.currentValue === anotherNumber.currentValue
    );
  }

  toString(): string {
    return `${'e'.repeat(this.depth)!}${
      this.currentValue >= 1e12
        ? (+this.currentValue.toExponential(3)).toExponential().replace('+', '')
        : (+this.currentValue.toFixed(3)).toPrecision()
    }`;
  }
}

function logb(base: BigNumber, value: BigNumber): number {
  return Math.log(value.currentValue) / Math.log(base.currentValue);
}
