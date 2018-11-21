import { Store, createStore, Action, combineReducers } from "redux";
import { DictionaryModel, createDictionary } from "./models";

enum actionTypes {
  UPDATE_DICTIONARY = "UPDATE_DICTIONARY",
  DELETE_DICTIONARY = "DELETE_DICTIONARY",
  CREATE_DICTIONARY = "CREATE_DICTIONARY"
}

export interface AppState {
  dictionaries: DictionaryModel[];
}

interface UpdateDictionaryAction extends Action {
  payload: DictionaryModel;
}

interface DeleteDictionaryAction extends Action {
  payload: DictionaryModel;
}

interface CreateDictionaryAction extends Action {
  payload: string;
}

export function updateDictionaryAction(
  dictionary: DictionaryModel
): UpdateDictionaryAction {
  return {
    type: actionTypes.UPDATE_DICTIONARY,
    payload: dictionary
  };
}

export function deleteDictionaryAction(
  dictionary: DictionaryModel
): DeleteDictionaryAction {
  return {
    type: actionTypes.DELETE_DICTIONARY,
    payload: dictionary
  };
}

export function createDictionaryAction(name: string): CreateDictionaryAction {
  return {
    type: actionTypes.CREATE_DICTIONARY,
    payload: name
  };
}

export function dictionaries(
  state: DictionaryModel[] = [],
  action: Action
): DictionaryModel[] {
  switch (action.type) {
    case actionTypes.UPDATE_DICTIONARY: {
      const dictionaries = [...state];
      const { payload: dictionary } = action as UpdateDictionaryAction;
      const index = dictionaries.findIndex(({ id }) => id === dictionary.id);

      dictionaries[index] = dictionary;
      return dictionaries;
    }
    case actionTypes.DELETE_DICTIONARY: {
      const dictionaries = [...state];
      const { payload: dictionary } = action as DeleteDictionaryAction;
      const index = dictionaries.findIndex(({ id }) => id === dictionary.id);

      dictionaries.splice(index, 1);
      return dictionaries;
    }
    case actionTypes.CREATE_DICTIONARY: {
      const dictionaries = [...state];
      const { payload: name } = action as CreateDictionaryAction;
      const dictionary = createDictionary(name);

      dictionaries.push(dictionary);
      return dictionaries;
    }
    default: {
      return state;
    }
  }
}

const rootReducer = combineReducers<AppState>({ dictionaries });

export function configureStore(initialState: AppState): Store<AppState> {
  return createStore(
    rootReducer,
    initialState,
    // @ts-ignore
    process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
