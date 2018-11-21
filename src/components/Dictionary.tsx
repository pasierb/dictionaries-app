import * as React from "react";
import { DictionaryEntryForm } from "./DictionaryEntryForm";
import { DictionaryModel, cloneDictionary } from "../models";

type Entry = {
  from: string;
  to: string;
};

export interface Props {
  dictionary: DictionaryModel;
  onUpdate: (dictionary: DictionaryModel) => void;
}

export class Dictionary extends React.Component<Props> {
  validateEntry = ({ from: origFrom, to: origTo }: Entry) => ({
    from,
    to
  }: Entry): boolean => {
    if (!from) return false;

    if (origFrom !== from) {
      return !this.props.dictionary.entries.has(from);
    }

    return true;
  };

  handleEditEntry = (key: string) => ({ from, to }: Entry) => {
    const dictionary = cloneDictionary(this.props.dictionary);
    dictionary.entries.delete(key);
    dictionary.entries.set(from, to);

    this.props.onUpdate(dictionary);
  };

  handleDeleteEntry = ({ from }: Entry) => {
    const dictionary = cloneDictionary(this.props.dictionary);
    dictionary.entries.delete(from);

    this.props.onUpdate(dictionary);
  };

  render() {
    const { dictionary } = this.props;
    const ordered = Array.from(dictionary.entries).sort((a, b) =>
      a[0].toLowerCase() > b[0].toLowerCase() ? 1 : -1
    );

    return (
      <React.Fragment>
        {ordered.map(([from, to]) => (
          <DictionaryEntryForm
            key={from}
            from={from}
            to={to}
            validate={this.validateEntry({ from, to })}
            onSubmit={this.handleEditEntry(from)}
            onDelete={this.handleDeleteEntry}
          />
        ))}

        <DictionaryEntryForm
          key={dictionary.entries.size}
          from=""
          to=""
          validate={this.validateEntry({ from: "", to: "" })}
          onSubmit={this.handleEditEntry("")}
        />
      </React.Fragment>
    );
  }
}
