import { connect } from 'react-redux';
import { Dictionary } from '../components/Dictionary';
import { updateDictionaryAction } from '../store';
import { DictionaryModel } from '../models';

interface DispatchFromProps {
	onUpdate: (dictionary: DictionaryModel) => void
}

export const DictionaryContainer = connect<never, DispatchFromProps>(null, dispatch => ({
	onUpdate(dictionary: DictionaryModel) {
		dispatch(updateDictionaryAction(dictionary))
  }
}))(Dictionary);
