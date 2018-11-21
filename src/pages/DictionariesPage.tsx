import * as React from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { AppState, deleteDictionaryAction } from "../store";
import { DictionaryModel } from "../models";
import { DictionaryList } from "../components/DictionaryList";
import NewDictionaryModalContainer from "../containers/NewDictionaryModalContainer";

interface Props {
  dictionaries: DictionaryModel[];
  deleteDictionary: (dictionary: DictionaryModel) => void;
}

interface State {
  newDictionaryModalOpen: boolean;
}

class DictionariesPage extends React.Component<
  Props & RouteComponentProps,
  State
> {
  state = {
    newDictionaryModalOpen: false
  };

  handleToggleModal = () => {
    this.setState(state => ({
      newDictionaryModalOpen: !state.newDictionaryModalOpen
    }));
  };

  render() {
    const { deleteDictionary, dictionaries } = this.props;
    const { newDictionaryModalOpen } = this.state;

    return (
      <div className="section">
        <h1 className="title is-1">Dictionaries</h1>

        <p className="has-text-right">
          <button
            onClick={this.handleToggleModal}
            className="button is-primary"
          >
            <i className="fas fa-plus" />
          </button>
        </p>

        <DictionaryList
          dictionaries={dictionaries}
          onDelete={deleteDictionary}
        />

        <NewDictionaryModalContainer
          open={newDictionaryModalOpen}
          onClose={this.handleToggleModal}
        />
      </div>
    );
  }
}

export default connect(
  ({ dictionaries }: AppState) => ({ dictionaries }),
  dispatch => {
    return {
      deleteDictionary: (dictionary: DictionaryModel) =>
        dispatch(deleteDictionaryAction(dictionary))
    };
  }
)(DictionariesPage);
