import * as React from 'react';
import { Link } from 'react-router-dom';
import { DictionaryModel } from '../models';

interface Props {
  dictionaries: DictionaryModel[]
  onDelete: (dictionary: DictionaryModel) => void
}

export const DictionaryList = (props: Props) => {
  const { onDelete, dictionaries } = props;
  const handleDelete = (dictionary: DictionaryModel) => () => onDelete(dictionary);

	return (
    <table className="table is-fullwidth">
			<thead>
				<tr>
					<th>Name</th>
					<th>Entries</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
        {dictionaries.length === 0 ? (
          <tr>
            <td colSpan={3}>No dictionaries</td>
          </tr>
        ) : dictionaries.map(dictionary =>
					<tr key={dictionary.id}>
						<td>
							<Link to={`/dictionary/${dictionary.id}`}>{dictionary.name}</Link>
						</td>
						<td>
							{dictionary.entries.size}
						</td>
						<td>
							<button className="button is-small is-danger" onClick={handleDelete(dictionary)}>
                <span className="icon">
                  <i className="fas fa-trash" />
                </span>
              </button>
						</td>
					</tr>
        )}
			</tbody>
    </table>
  );
}

