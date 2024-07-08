import { BigNumber } from 'src/app/core/models/big-number/big-number';

describe('BigNumber Model', (): void => {
  it('Creation', (): void => {
    expect(new BigNumber()).toBeInstanceOf(BigNumber);
  });

  it('Update degree', (): void => {
    let bigNumber: BigNumber;

    bigNumber = new BigNumber(10);
    expect(bigNumber.currentValue).toBe(10);
    expect(bigNumber.depth).toBe(0);

    bigNumber = new BigNumber(1e1);
    expect(bigNumber.currentValue).toBe(10);
    expect(bigNumber.depth).toBe(0);

    bigNumber = new BigNumber(1e12);
    expect(bigNumber.currentValue).toBe(1e12);
    expect(bigNumber.depth).toBe(0);

    bigNumber = new BigNumber(2e12);
    expect(bigNumber.currentValue).toBe(2e12);
    expect(bigNumber.depth).toBe(0);

    bigNumber = new BigNumber(2.1234567e12);
    expect(bigNumber.currentValue).toBe(2.1234567e12);
    expect(bigNumber.depth).toBe(0);

    bigNumber = new BigNumber(0.2e34);
    expect(bigNumber.currentValue).toBe(2e33);
    expect(bigNumber.depth).toBe(0);

    bigNumber = new BigNumber(1e50);
    expect(bigNumber.currentValue).toBe(1e50);
    expect(bigNumber.depth).toBe(0);

    bigNumber = new BigNumber(1e99);
    expect(bigNumber.currentValue).toBe(1e99);
    expect(bigNumber.depth).toBe(0);

    bigNumber = new BigNumber(1e100);
    expect(bigNumber.currentValue).toBe(100);
    expect(bigNumber.depth).toBe(1);

    bigNumber = new BigNumber(100, 2);
    expect(bigNumber.currentValue).toBe(100);
    expect(bigNumber.depth).toBe(2);

    bigNumber = new BigNumber(99, 2);
    expect(bigNumber.currentValue).toBe(1e99);
    expect(bigNumber.depth).toBe(1);

    bigNumber = new BigNumber(10, 2);
    expect(bigNumber.currentValue).toBe(10000000000);
    expect(bigNumber.depth).toBe(1);
  });

  it('To string', (): void => {
    let bigNumber: BigNumber;

    bigNumber = new BigNumber(10);
    expect(bigNumber.toString()).toBe('10');

    bigNumber = new BigNumber(10.12345678);
    expect(bigNumber.toString()).toBe('10.123');

    bigNumber = new BigNumber(1.12345678);
    expect(bigNumber.toString()).toBe('1.123');

    bigNumber = new BigNumber(1e11);
    expect(bigNumber.toString()).toBe('100000000000');

    bigNumber = new BigNumber(1e11);
    bigNumber.plus(0.12345678);
    expect(bigNumber.toString()).toBe('100000000000.123');

    bigNumber = new BigNumber(1.12345678e11);
    expect(bigNumber.toString()).toBe('112345678000');

    bigNumber = new BigNumber(1e12);
    expect(bigNumber.toString()).toBe('1e12');

    bigNumber = new BigNumber(1.12345678e12);
    expect(bigNumber.toString()).toBe('1.123e12');

    bigNumber = new BigNumber(1e99);
    expect(bigNumber.toString()).toBe('1e99');

    bigNumber = new BigNumber(1e100);
    expect(bigNumber.toString()).toBe('e100');

    bigNumber = new BigNumber(1e101);
    expect(bigNumber.toString()).toBe('e101');

    bigNumber = new BigNumber(2e100);
    expect(bigNumber.toString()).toBe('e100.301');

    bigNumber = new BigNumber(10, 2);
    expect(bigNumber.toString()).toBe('e10000000000');

    bigNumber = new BigNumber(12, 2);
    expect(bigNumber.toString()).toBe('e1e12');

    bigNumber = new BigNumber(100, 2);
    expect(bigNumber.toString()).toBe('ee100');

    bigNumber = new BigNumber(100, 5);
    expect(bigNumber.toString()).toBe('eeeee100');
  });

  it('Plus operation', (): void => {
    let first: BigNumber;
    let second: BigNumber;

    first = new BigNumber(10);
    second = new BigNumber(10);
    first.plus(second);
    expect(first.currentValue).toBe(20);
    expect(first.depth).toBe(0);

    first = new BigNumber(5e99);
    second = new BigNumber(5e99);
    first.plus(second);
    expect(first.currentValue).toBe(100);
    expect(first.depth).toBe(1);

    first = new BigNumber(1e100);
    second = new BigNumber(1);
    first.plus(second);
    expect(first.currentValue).toBe(100);
    expect(first.depth).toBe(1);

    first = new BigNumber(1);
    second = new BigNumber(1e100);
    first.plus(second);
    expect(first.currentValue).toBe(100);
    expect(first.depth).toBe(1);

    first = new BigNumber(1e100);
    second = new BigNumber(1e100);
    first.plus(second);
    expect(first.currentValue).toBeCloseTo(100.301);
    expect(first.depth).toBe(1);

    first = new BigNumber(1e100);
    second = new BigNumber(1e101);
    first.plus(second);
    expect(first.currentValue).toBeCloseTo(101.041);
    expect(first.depth).toBe(1);

    first = new BigNumber(10, 2);
    second = new BigNumber(10, 1);
    first.plus(second);
    expect(first.currentValue).toBe(10000000000);
    expect(first.depth).toBe(1);

    first = new BigNumber(10, 3);
    second = new BigNumber(10, 3);
    first.plus(second);
    expect(first.currentValue).toBe(10000000000);
    expect(first.depth).toBe(2);

    first = new BigNumber(10, 2);
    second = new BigNumber(10, 2);
    first.plus(second);
    expect(first.currentValue).toBeCloseTo(10000000000.301);
    expect(first.depth).toBe(1);

    first = new BigNumber(10, 2);
    second = new BigNumber(20, 2);
    first.plus(second);
    expect(first.currentValue).toBe(100000000000000000000);
    expect(first.depth).toBe(1);

    first = new BigNumber(10, 2);
    second = new BigNumber(20, 3);
    first.plus(second);
    expect(first.currentValue).toBe(100000000000000000000);
    expect(first.depth).toBe(2);

    first = new BigNumber(10, 3);
    second = new BigNumber(20, 2);
    first.plus(second);
    expect(first.currentValue).toBe(10000000000);
    expect(first.depth).toBe(2);
  });

  it('Minus operation', (): void => {
    let first: BigNumber;
    let second: BigNumber;

    first = new BigNumber(10);
    second = new BigNumber(10);
    first.minus(second);
    expect(first.currentValue).toBe(0);
    expect(first.depth).toBe(0);

    first = new BigNumber(5e99);
    second = new BigNumber(5e99);
    first.minus(second);
    expect(first.currentValue).toBe(0);
    expect(first.depth).toBe(0);

    first = new BigNumber(1e100);
    second = new BigNumber(1);
    first.minus(second);
    expect(first.currentValue).toBe(100);
    expect(first.depth).toBe(1);

    first = new BigNumber(1);
    second = new BigNumber(1e100);
    first.minus(second);
    expect(first.currentValue).toBe(0);
    expect(first.depth).toBe(0);

    first = new BigNumber(1e100);
    second = new BigNumber(1e100);
    first.minus(second);
    expect(first.currentValue).toBe(0);
    expect(first.depth).toBe(0);

    first = new BigNumber(1e100);
    second = new BigNumber(1e101);
    first.minus(second);
    expect(first.currentValue).toBe(0);
    expect(first.depth).toBe(0);

    first = new BigNumber(1e101);
    second = new BigNumber(1e100);
    first.minus(second);
    expect(first.currentValue).toBeCloseTo(100.954);
    expect(first.depth).toBe(1);

    first = new BigNumber(10, 2);
    second = new BigNumber(10, 1);
    first.minus(second);
    expect(first.currentValue).toBe(10000000000);
    expect(first.depth).toBe(1);

    first = new BigNumber(10, 3);
    second = new BigNumber(10, 3);
    first.minus(second);
    expect(first.currentValue).toBe(0);
    expect(first.depth).toBe(0);

    first = new BigNumber(10, 2);
    second = new BigNumber(10, 2);
    first.minus(second);
    expect(first.currentValue).toBe(0);
    expect(first.depth).toBe(0);

    first = new BigNumber(20, 2);
    second = new BigNumber(10, 2);
    first.minus(second);
    expect(first.currentValue).toBe(100000000000000000000);
    expect(first.depth).toBe(1);

    first = new BigNumber(20, 1);
    second = new BigNumber(10, 1);
    first.minus(second);
    expect(first.currentValue).toBe(100000000000000000000 - 10000000000);
    expect(first.depth).toBe(0);

    first = new BigNumber(10, 2);
    second = new BigNumber(20, 3);
    first.minus(second);
    expect(first.currentValue).toBe(0);
    expect(first.depth).toBe(0);

    first = new BigNumber(10, 3);
    second = new BigNumber(20, 2);
    first.minus(second);
    expect(first.currentValue).toBe(10000000000);
    expect(first.depth).toBe(2);
  });

  it('Multiply operation', (): void => {
    let first: BigNumber;
    let second: BigNumber;

    first = new BigNumber(10);
    second = new BigNumber(10);
    first.multiply(second);
    expect(first.currentValue).toBe(100);
    expect(first.depth).toBe(0);

    first = new BigNumber(1);
    second = new BigNumber(10);
    first.multiply(second);
    expect(first.currentValue).toBe(10);
    expect(first.depth).toBe(0);

    first = new BigNumber(10);
    second = new BigNumber(1);
    first.multiply(second);
    expect(first.currentValue).toBe(10);
    expect(first.depth).toBe(0);

    first = new BigNumber(1e50);
    second = new BigNumber(1e50);
    first.multiply(second);
    expect(first.currentValue).toBe(100);
    expect(first.depth).toBe(1);

    first = new BigNumber(1e100);
    second = new BigNumber(2);
    first.multiply(second);
    expect(first.currentValue).toBeCloseTo(100.301);
    expect(first.depth).toBe(1);

    first = new BigNumber(2);
    second = new BigNumber(1e100);
    first.multiply(second);
    expect(first.currentValue).toBeCloseTo(100.301);
    expect(first.depth).toBe(1);

    first = new BigNumber(1e100);
    second = new BigNumber(1e100);
    first.multiply(second);
    expect(first.currentValue).toBe(200);
    expect(first.depth).toBe(1);

    first = new BigNumber(100, 1);
    second = new BigNumber(100, 1);
    first.multiply(second);
    expect(first.currentValue).toBe(200);
    expect(first.depth).toBe(1);

    first = new BigNumber(100, 2);
    second = new BigNumber(100, 2);
    first.multiply(second);
    expect(first.currentValue).toBeCloseTo(100.301);
    expect(first.depth).toBe(2);

    first = new BigNumber(100, 1);
    second = new BigNumber(100, 2);
    first.multiply(second);
    expect(first.currentValue).toBe(100);
    expect(first.depth).toBe(2);

    first = new BigNumber(100, 2);
    second = new BigNumber(100, 1);
    first.multiply(second);
    expect(first.currentValue).toBe(100);
    expect(first.depth).toBe(2);

    first = new BigNumber(100, 1);
    second = new BigNumber(100);
    first.multiply(second);
    expect(first.currentValue).toBe(102);
    expect(first.depth).toBe(1);

    first = new BigNumber(100);
    second = new BigNumber(100, 1);
    first.multiply(second);
    expect(first.currentValue).toBe(102);
    expect(first.depth).toBe(1);

    first = new BigNumber(100);
    second = new BigNumber(0);
    first.multiply(second);
    expect(first.currentValue).toBe(0);
    expect(first.depth).toBe(0);

    first = new BigNumber(100, 100);
    second = new BigNumber(0);
    first.multiply(second);
    expect(first.currentValue).toBe(0);
    expect(first.depth).toBe(0);
  });

  it('Divide operation', (): void => {
    let first: BigNumber;
    let second: BigNumber;

    first = new BigNumber(10);
    second = new BigNumber(10);
    first.divide(second);
    expect(first.currentValue).toBe(1);
    expect(first.depth).toBe(0);

    first = new BigNumber(1);
    second = new BigNumber(10);
    first.divide(second);
    expect(first.currentValue).toBe(0.1);
    expect(first.depth).toBe(0);

    first = new BigNumber(10);
    second = new BigNumber(1);
    first.divide(second);
    expect(first.currentValue).toBe(10);
    expect(first.depth).toBe(0);

    first = new BigNumber(1e50);
    second = new BigNumber(1e50);
    first.divide(second);
    expect(first.currentValue).toBe(1);
    expect(first.depth).toBe(0);

    first = new BigNumber(1e101);
    second = new BigNumber(2);
    first.divide(second);
    expect(first.currentValue).toBeCloseTo(100.699);
    expect(first.depth).toBe(1);

    first = new BigNumber(2);
    second = new BigNumber(1e100);
    first.divide(second);
    expect(first.currentValue).toBe(0);
    expect(first.depth).toBe(0);

    first = new BigNumber(1e100);
    second = new BigNumber(1e100);
    first.divide(second);
    expect(first.currentValue).toBe(1);
    expect(first.depth).toBe(0);

    first = new BigNumber(100, 1);
    second = new BigNumber(100, 1);
    first.divide(second);
    expect(first.currentValue).toBe(1);
    expect(first.depth).toBe(0);

    first = new BigNumber(101, 2);
    second = new BigNumber(100, 2);
    first.divide(second);
    expect(first.currentValue).toBeCloseTo(100.954);
    expect(first.depth).toBe(2);

    first = new BigNumber(100, 1);
    second = new BigNumber(100, 2);
    first.divide(second);
    expect(first.currentValue).toBe(0);
    expect(first.depth).toBe(0);

    first = new BigNumber(101, 2);
    second = new BigNumber(100, 1);
    first.divide(second);
    expect(first.currentValue).toBe(101);
    expect(first.depth).toBe(2);

    first = new BigNumber(102, 1);
    second = new BigNumber(100);
    first.divide(second);
    expect(first.currentValue).toBe(100);
    expect(first.depth).toBe(1);

    first = new BigNumber(100);
    second = new BigNumber(100, 1);
    first.divide(second);
    expect(first.currentValue).toBe(0);
    expect(first.depth).toBe(0);
  });

  it('Power operation', (): void => {
    let base: BigNumber;
    let power: BigNumber;

    base = new BigNumber(10);
    power = new BigNumber(10);
    base.pow(power);
    expect(base.currentValue).toBe(1e10);
    expect(base.depth).toBe(0);

    base = new BigNumber(100);
    power = new BigNumber(10);
    base.pow(power);
    expect(base.currentValue).toBe(1e20);
    expect(base.depth).toBe(0);

    base = new BigNumber(10);
    power = new BigNumber(100);
    base.pow(power);
    expect(base.currentValue).toBe(100);
    expect(base.depth).toBe(1);

    base = new BigNumber(10, 1);
    power = new BigNumber(10, 1);
    base.pow(power);
    expect(base.currentValue).toBe(100000000000);
    expect(base.depth).toBe(1);

    base = new BigNumber(100, 1);
    power = new BigNumber(2);
    base.pow(power);
    expect(base.currentValue).toBe(200);
    expect(base.depth).toBe(1);

    base = new BigNumber(100, 1);
    power = new BigNumber(100, 1);
    base.pow(power);
    expect(base.currentValue).toBe(102);
    expect(base.depth).toBe(2);

    base = new BigNumber(100, 1);
    power = new BigNumber(0.1);
    base.pow(power);
    expect(base.currentValue).toBe(1e10);
    expect(base.depth).toBe(0);

    base = new BigNumber(101, 2);
    power = new BigNumber(0.1);
    base.pow(power);
    expect(base.currentValue).toBeCloseTo(100);
    expect(base.depth).toBe(2);
  });

  it('Root operation', (): void => {
    let value: BigNumber;
    let base: BigNumber;

    value = new BigNumber(10);
    base = new BigNumber(10);
    value.root(base);
    expect(value.currentValue).toBeCloseTo(1.259);
    expect(value.depth).toBe(0);

    value = new BigNumber(64);
    base = new BigNumber(2);
    value.root(base);
    expect(value.currentValue).toBeCloseTo(8);
    expect(value.depth).toBe(0);

    value = new BigNumber(100, 1);
    base = new BigNumber(10);
    value.root(base);
    expect(value.currentValue).toBe(1e10);
    expect(value.depth).toBe(0);

    value = new BigNumber(10, 1);
    base = new BigNumber(10, 1);
    value.root(base);
    expect(value.currentValue).toBeCloseTo(1);
    expect(value.depth).toBe(0);

    value = new BigNumber(10, 2);
    base = new BigNumber(10, 1);
    value.root(base);
    expect(value.currentValue).toBe(10);
    expect(value.depth).toBe(0);

    value = new BigNumber(20, 2);
    base = new BigNumber(20, 1);
    value.root(base);
    expect(value.currentValue).toBe(10);
    expect(value.depth).toBe(0);

    value = new BigNumber(20, 2);
    base = new BigNumber(10, 1);
    value.root(base);
    expect(value.currentValue).toBe(1e10);
    expect(value.depth).toBe(1);

    value = new BigNumber(100, 1);
    base = new BigNumber(2);
    value.root(base);
    expect(value.currentValue).toBe(1e50);
    expect(value.depth).toBe(0);

    value = new BigNumber(101, 2);
    base = new BigNumber(2);
    value.root(base);
    expect(value.currentValue).toBeCloseTo(100.699);
    expect(value.depth).toBe(2);

    value = new BigNumber(100, 1);
    base = new BigNumber(100, 1);
    value.root(base);
    expect(value.currentValue).toBe(1);
    expect(value.depth).toBe(0);

    value = new BigNumber(100, 1);
    base = new BigNumber(0.1);
    value.root(base);
    expect(value.currentValue).toBe(1000);
    expect(value.depth).toBe(1);

    value = new BigNumber(100, 2);
    base = new BigNumber(0.1);
    value.root(base);
    expect(value.currentValue).toBe(101);
    expect(value.depth).toBe(2);
  });

  it('Log operation', (): void => {
    let value: BigNumber;
    let base: BigNumber;

    value = new BigNumber(10);
    base = new BigNumber(10);
    value.log(base);
    expect(value.currentValue).toBeCloseTo(1);
    expect(value.depth).toBe(0);

    value = new BigNumber(100);
    base = new BigNumber(10);
    value.log(base);
    expect(value.currentValue).toBeCloseTo(2);
    expect(value.depth).toBe(0);

    value = new BigNumber(10);
    base = new BigNumber(100);
    value.log(base);
    expect(value.currentValue).toBeCloseTo(0.5);
    expect(value.depth).toBe(0);

    value = new BigNumber(100, 1);
    base = new BigNumber(100);
    value.log(base);
    expect(value.currentValue).toBeCloseTo(50);
    expect(value.depth).toBe(0);

    value = new BigNumber(1e90);
    base = new BigNumber(100, 1);
    value.log(base);
    expect(value.currentValue).toBeCloseTo(0.9);
    expect(value.depth).toBe(0);

    value = new BigNumber(100, 1);
    base = new BigNumber(100, 1);
    value.log(base);
    expect(value.currentValue).toBeCloseTo(1);
    expect(value.depth).toBe(0);

    value = new BigNumber(100, 2);
    base = new BigNumber(100, 1);
    value.log(base);
    expect(value.currentValue).toBeCloseTo(1e98);
    expect(value.depth).toBe(0);
  });

  it('isEqual', (): void => {
    let first: BigNumber;
    let second: BigNumber;

    first = new BigNumber(10);
    second = new BigNumber(10);
    expect(first.isEqual(second)).toBeTrue();

    first = new BigNumber(100, 1);
    second = new BigNumber(100, 1);
    expect(first.isEqual(second)).toBeTrue();

    first = new BigNumber(0);
    second = new BigNumber(0);
    expect(first.isEqual(second)).toBeTrue();

    first = new BigNumber(0.1);
    second = new BigNumber(0.1);
    expect(first.isEqual(second)).toBeTrue();

    first = new BigNumber(0.1);
    second = new BigNumber(0.2);
    expect(first.isEqual(second)).toBeFalse();

    first = new BigNumber(10);
    second = new BigNumber(20);
    expect(first.isEqual(second)).toBeFalse();

    first = new BigNumber(10);
    second = new BigNumber(10, 1);
    expect(first.isEqual(second)).toBeFalse();

    first = new BigNumber(10, 10);
    second = new BigNumber(10, 1);
    expect(first.isEqual(second)).toBeFalse();
  });
});
