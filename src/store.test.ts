import {
  updateDictionaryAction,
  createDictionaryAction,
  deleteDictionaryAction,
  dictionaries
} from "./store";
import { createDictionary, cloneDictionary } from "./models";

export default describe("store", () => {
  describe("dictionaries reducer", () => {
    describe("updateDictionaryAction", () => {
      it("should update dictionary", () => {
        const d1 = createDictionary("one");
        const d2 = createDictionary("two");
        const d2clone = cloneDictionary(d2);

        const state = dictionaries([d1, d2], updateDictionaryAction(d2clone));
        expect(state.indexOf(d2)).toBe(-1);
        expect(state.indexOf(d2clone)).toBe(1);
      });
    });

    describe("deleteDictionaryAction", () => {
      it("should remove dictionary from store", () => {
        const d1 = createDictionary("one");
        const d2 = createDictionary("two");
        const d3 = createDictionary("three");

        const state = dictionaries([d1, d2, d3], deleteDictionaryAction(d2));

        expect(state.length).toBe(2);
        expect(state.indexOf(d2)).toBe(-1);
      });
    });

    describe("createDictionaryAction", () => {
      it("should add dictionary to store", () => {
        const name = "Foo";

        const state = dictionaries([], createDictionaryAction(name));

        expect(state.length).toBe(1);
        expect(state[0].name).toBe(name);
      });
    });
  });
});
