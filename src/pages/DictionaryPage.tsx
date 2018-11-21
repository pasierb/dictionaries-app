import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../store";
import { DictionaryContainer } from "../containers/DictionaryContainer";
import { DictionaryModel } from "../models";

interface Props extends RouteComponentProps<{ id: string }> {
  dictionary?: DictionaryModel;
}

const DictionaryPage = (props: Props) => {
  const { dictionary } = props;

  return (
    <React.Fragment>
      <div className="navbar">
        <Link to="/">
          <span className="icon">
            <i className="fas fa-angle-left" />
          </span>
          <span>Back to dictionary list</span>
        </Link>
      </div>
      <div className="section">
        {dictionary ? (
          <DictionaryContainer dictionary={dictionary} />
        ) : (
          <h2 className="title is-2 has-text-centered">Dictionary not found</h2>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ dictionaries }: AppState, ownProps: Props) => {
  const dictionary = dictionaries.find(
    dictionary => dictionary.id === +ownProps.match.params.id
  );

  return {
    ...ownProps,
    dictionary
  } as Props;
};

export default connect(mapStateToProps)(DictionaryPage);
