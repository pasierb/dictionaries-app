import * as React from 'react';

interface Props {
	from: string
	to: string
	validate: (entry: { from: string, to: string }) => boolean
	onSubmit: (entry: { from: string, to: string }) => void
	onDelete?: (entry: { from: string, to: string }) => void
}

interface State {
	from: string
  to: string
  invalid: boolean
}

class DictionaryEntryForm extends React.Component<Props, State> {
	state = {
		from: '',
    to: '',
    invalid: false
	}

	reset = () => {
		const { from, to } = this.props;

		this.setState({ from, to });
	}

	handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;

		this.setState(state => ({
			...state,
			[name]: value
		}), () => {
      const { from, to } = this.state;

      this.setState({ invalid: !this.props.validate({ from, to }) });
    });
	}

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { from, to } = this.state;
		const entry = { from, to };

		if (this.props.validate(entry)) {
			this.props.onSubmit(entry);
		} else {
      alert('invalid')
    }
	}

	handleDelete = () => {
		const { onDelete, from, to } = this.props;

		if (onDelete) {
			onDelete({ from, to });
		}
	}

	componentDidMount() {
		this.reset();
	}

	render() {
		const { from, to, invalid } = this.state;
		const { onDelete } = this.props;

		return (
			<form onSubmit={this.handleSubmit} className="columns">
        <div className="column">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                name="from"
                type="text"
                value={from}
                className={['input', invalid && 'is-danger'].join(' ')}
                required
                onChange={this.handleInputChange}
              />
            </div>
            <div className="control">
              <span className="button is-static">
                <i className="fas fa-long-arrow-alt-right" />
              </span>
            </div>
            <div className="control is-expanded">
              <input
                name="to"
                type="text"
                value={to}
                className="input"
                required
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="column is-narrow">
          <button type="submit" className="button is-primary" disabled={invalid}>
            <span className="icon">
              <i className="fas fa-save" />
            </span>
          </button>
          <button onClick={this.handleDelete} className="button is-danger" style={{ visibility: onDelete ? 'visible' : 'hidden' }}>
            <span className="icon">
              <i className="fas fa-trash" />
            </span>
          </button>
        </div>
			</form>
		)
	}
}

export { DictionaryEntryForm };
