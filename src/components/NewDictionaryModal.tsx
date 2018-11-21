import * as React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

interface State {
  keyListener: (e: KeyboardEvent) => void;
}

class NewDictionaryModal extends React.Component<Props, State> {
  closeOnEsc = (e: KeyboardEvent) => {
    const { onClose, open } = this.props;

    if (open && e.key === "Escape") {
      onClose();
    }
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { onSubmit, onClose } = this.props;

    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    onSubmit(name);
    onClose();
  };

  componentDidMount() {
    this.setState(
      {
        keyListener: this.closeOnEsc
      },
      () => {
        window.addEventListener("keyup", this.state.keyListener);
      }
    );
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.state.keyListener);
  }

  render() {
    const { open, onClose } = this.props;
    const style = {
      display: open ? "block" : "none"
    };

    return (
      <div className="modal" style={style}>
        <div className="modal-background" onClick={onClose} />
        <div className="modal-card">
          <form onSubmit={this.handleSubmit}>
            <header className="modal-card-head">
              <p className="modal-card-title">New dictionary</p>
            </header>
            <div className="modal-card-body">
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input type="text" className="input" name="name" required />
                </div>
              </div>
            </div>
            <footer className="modal-card-foot">
              <button type="submit" className="button is-primary">
                Create
              </button>
              <button className="button" onClick={onClose}>
                Cancel
              </button>
            </footer>
          </form>
        </div>
        <button
          onClick={onClose}
          className="modal-close is-large"
          aria-label="close"
        />
      </div>
    );
  }
}

export { NewDictionaryModal };
