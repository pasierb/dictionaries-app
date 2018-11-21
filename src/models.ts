export type DictionaryModel = {
  id: number;
  name: string;
  entries: Map<string, string>;
};

export function cloneDictionary(dictionary: DictionaryModel): DictionaryModel {
  const { entries, ...rest } = dictionary;

  return {
    ...rest,
    entries: new Map<string, string>(entries)
  };
}

export function createDictionary(name: string): DictionaryModel {
  return {
    id: Math.round(Math.random() * 100000),
    name,
    entries: new Map<string, string>()
  };
}
