import React from "react";
import axios from "axios";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      list: { loading: false, data: [], err: null },
      detail: { loading: false, data: null, err: null}
    };
  }

  componentDidMount() {
    this.setState({ list: { ...this.state.list, loading: true } });
    axios.get("https://api.github.com/users?per_page=100")
      .then(res => {
        this.setState({ list: { err: null, loading: false, data: res.data } });
      })
      .catch(err => {
        this.setState({ list: { ...this.state.list, loading: false, err: err } });
      });
  }

  handleDetail = id => {
    this.setState({ detail: { ...this.state.detail, loading: true } });
    axios.get(`https://api.github.com/users/${id}`)
      .then(res => {
        this.setState({ detail: { err: null, loading: false, data: res.data } });
      })
      .catch(err => {
        this.setState({ detail: { ...this.state.detail, loading: false, err: err } });
      });
  }

  render() {
    console.log(this.state);
    const { list, detail } = this.state;
    return (
      <div className="container">
        {list.loading ? <div>loading....</div> :
          <div>
            {list.err && <div style={{color: "red"}}>Oops, something was wrong.</div>}
            <h2>List</h2>
            <table className="user-list">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>username</th>
                  <th>image</th>
                </tr>
              </thead>
              <tbody>
                {list.data.map((user, index) => (
                  <tr key={index} onClick={() => this.handleDetail(user.login)} className="list-row">
                    <td>{user.id}</td>
                    <td>{user.login}</td>
                    <td><img src={user.avatar_url} alt={user.login}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }



        <div>
          <h2>Detail</h2>
          <div>
            {detail.loading && <div>loading...</div>}
            {!detail.loading && detail.data && <div>
              <div>{`name: ${detail.data.name}`}</div>
              <div>{`location: ${detail.data.location}`}</div>
              <div>{`following: ${detail.data.following}`}</div>
              <div>{`followers: ${detail.data.followers}`}</div>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;