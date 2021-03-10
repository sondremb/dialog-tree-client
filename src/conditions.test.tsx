import { assert, expect } from 'chai';

describe('condition resolving', () => {
  let mem: Memory = {
    seen: new Set([1, 2, 3]),
    facts: {
      numFact1: 1,
      numFact3: 3,
      trueFact: true,
      falseFact: false,
      stringFact: 'Astra',
    },
  };

  const getConstant = (value: factValue) =>
    ({ type: 'CONSTANT', value } as const);
  const getFact = (name: factName) => ({ type: 'FACT', name } as const);

  describe('comparators', () => {
    it('fact greater than constant', () => {
      // 1 > 2 => false
      assert(
        !resolve(
          {
            op: 'GT',
            lhs: 'numFact1',
            rhs: getConstant(2),
          },
          mem
        )
      );
      // 3 > 2 => true
      assert(
        resolve(
          {
            op: 'GT',
            lhs: 'numFact3',
            rhs: getConstant(2),
          },
          mem
        )
      );
    });

    it('fact greater than fact', () => {
      // 1 > 3 => false
      assert(
        !resolve(
          {
            op: 'GT',
            lhs: 'numFact1',
            rhs: getFact('numFact3'),
          },
          mem
        )
      );
      // 3 > 1 => true
      assert(
        resolve(
          {
            op: 'GT',
            lhs: 'numFact3',
            rhs: getFact('numFact1'),
          },
          mem
        )
      );
    });

    it('fact greater than constant', () => {
      // 1 > 2 => false
      assert(
        !resolve(
          {
            op: 'GT',
            lhs: 'numFact1',
            rhs: getConstant(2),
          },
          mem
        )
      );
      // 3 > 2 => true
      assert(
        resolve(
          {
            op: 'GT',
            lhs: 'numFact3',
            rhs: getConstant(2),
          },
          mem
        )
      );
    });

    it('fact greater than fact', () => {
      // 1 > 3 => false
      assert(
        !resolve(
          {
            op: 'GT',
            lhs: 'numFact1',
            rhs: getFact('numFact3'),
          },
          mem
        )
      );
      // 3 > 1 => true
      assert(
        resolve(
          {
            op: 'GT',
            lhs: 'numFact3',
            rhs: getFact('numFact1'),
          },
          mem
        )
      );
    });

    it('fact less than constant', () => {
      // 1 < 2 => true
      assert(
        resolve(
          {
            op: 'LT',
            lhs: 'numFact1',
            rhs: getConstant(2),
          },
          mem
        )
      );
      // 3 < 2 => false
      assert(
        !resolve(
          {
            op: 'LT',
            lhs: 'numFact3',
            rhs: getConstant(2),
          },
          mem
        )
      );
    });

    it('fact less than fact', () => {
      // 1 < 3 => true
      assert(
        resolve(
          {
            op: 'LT',
            lhs: 'numFact1',
            rhs: getFact('numFact3'),
          },
          mem
        )
      );
      // 3 < 1 => false
      assert(
        !resolve(
          {
            op: 'LT',
            lhs: 'numFact3',
            rhs: getFact('numFact1'),
          },
          mem
        )
      );
    });
  });
});
