import React, { Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

const initialState = {
  name: '',
  description: '',
  rooms: [],
  options: [],
  selectedRooms: []
}

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onRoomSelect = this.onRoomSelect.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    axios.get('http://localhost:9097/room/')
    .then(response => {
      this.setState({ rooms: response.data.data }, () => {
        let data = [];
        this.state.rooms.map((item, index) => {
          let room = {
            value: item._id,
            label: item.code
          }
          data.push(room)
        });
        this.setState({ options: data });
      })
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onRoomSelect(e) {
    this.setState({ selectedRooms: e ? e.map(item => item.value) : [] });
  }

  onSubmit(e) {
    e.preventDefault();
    let category = {
      name: this.state.name,
      description: this.state.description
    };
    console.log('DATA TO SEND', category)
    axios.post('http://localhost:9097/category/create', category)
    .then(response => {
      alert('Category Data successfully inserted')
    })
    .catch(error => {
      console.log(error.message);
      alert(error.message)
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Create Category</h1>
        <form onSubmit={this.onSubmit}>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">Category Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="categoryName" 
              name="name" 
              value={this.state.name} 
              onChange={this.onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryDes" className="form-label">Description</label>
            <input 
              type="text" 
              className="form-control" 
              id="categoryDes" 
              name="description" 
              value={this.state.description} 
              onChange={this.onChange}
            />
          </div>
          <Select 
            options={this.state.options}
            onChange={this.onRoomSelect}
            className="basic-multi-select"
            isMulti
          />
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateCategory;