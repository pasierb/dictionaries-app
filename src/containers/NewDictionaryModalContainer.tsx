import { connect } from "react-redux";
import { NewDictionaryModal } from "../components/NewDictionaryModal";
import { createDictionaryAction } from "../store";

export default connect(
  null,
  dispatch => ({
    onSubmit: (name: string) => dispatch(createDictionaryAction(name))
  })
)(NewDictionaryModal);
