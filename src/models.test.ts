import { createDictionary, cloneDictionary } from './models';

export default describe('models', () => {
  describe('createDictionary', () => {
    it('should set name', () => {
      const name = 'Bar';
      const d = createDictionary(name);

      expect(d.name).toBe(name);
    });

    it('should set id', () => {
      const d = createDictionary(name);

      expect(d.id).toBeGreaterThan(0);
    });

    it('should set empty map', () => {
      const d = createDictionary('foo');

      expect(d.entries).toBeInstanceOf(Map);
      expect(d.entries.size).toBe(0);
    });
  });

  describe('cloneDictionary', () => {
    it('should make a shallow copy', () => {
      const d = createDictionary('foo');
      const clone = cloneDictionary(d);

      expect(d).not.toBe(clone);
      expect(d).toEqual(clone);
    })
  });
});
