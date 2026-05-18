import React, { Component } from 'react';
import AddPersonForm from './AddPersonForm';
import { produce } from "immer";
import axios from 'axios';


class PeopleTable extends Component {
    state = {
        people: [],
        currentPerson: {
            id: '',
            firstName: '',
            lastName: '',
            age: '',
            isChecked: false,
            isEditing: false
        }
    }

    loadPeople() {
        axios.get('/api/people/getall').then(response => {
            this.setState({ people: response.data, isLoading: false })
        })
    }

    componentDidMount() {
        this.loadPeople();
    }

    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft.currentPerson[e.target.name] = e.target.value;
        });
        this.setState(nextState);
        console.log(this.state.currentPerson);
    }

    onAddClick = () => {
        axios.post('/api/people/add', this.state.currentPerson).then(() => {
            this.setState({ currentPerson: { firstName: '', lastName: '', age: '' } });
            this.loadPeople();
        })
    }

    onCheckAllClick = () => {
        const nextState = produce(this.state, draft => {
            draft.people.forEach(p => p.isChecked = true);
        });
        this.setState(nextState);
    }

    onUncheckAllClick = () => {
        const nextState = produce(this.state, draft => {
            draft.people.forEach(p => p.isChecked = false);
        });
        this.setState(nextState);
    }

    onDeleteAllClick = () => {
        const people = this.state.people.filter(p => p.isChecked);
        axios.post('/api/people/deletemultiple', { ids: people.map(p => p.id) }).then(() => {
            this.loadPeople();
        });
    }


    onEditClick = (p) => {
        console.log(p);
        const nextState = produce(this.state, draft => {
            draft.currentPerson = { ...p };
            draft.currentPerson.isEditing = true;
        });
        this.setState(nextState);
    }

    onDeleteClick = (id) => {
        axios.post('/api/people/delete', { id }).then(() => {
            this.loadPeople();
        });
    }

    onUpdateClick = () => {
        axios.post('/api/people/edit', this.state.currentPerson).then(() => {
            this.setState({ currentPerson: { firstName: '', lastName: '', age: '', isChecked: false, isEditing: false } });
            this.loadPeople();
        });
    }

    onCancelClick = () => {

        this.setState({ currentPerson: { id: '', firstName: '', lastName: '', age: '', isChecked: false, isEditing: false } });

        console.log(this.state.currentPerson);
    }

    onCheckChanged = id => {
        const nextState = produce(this.state, draft => {
            const person = draft.people.find(p => p.id === id);
            person.isChecked = !person.isChecked;
        });
        this.setState(nextState)
        console.log(nextState);
    }

    render() {
        const { firstName, lastName, age, isEditing } = this.state.currentPerson;
        return <div className='container mt-5'>
            <AddPersonForm
                firstName={firstName}
                lastName={lastName}
                age={age}
                isEditing={isEditing}
                onTextChange={this.onTextChange}
                onAddClick={this.onAddClick}
                onUpdateClick={this.onUpdateClick}
                onCancelClick={this.onCancelClick}
            />
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th className="vstack gap-2">
                            <button onClick={this.onDeleteAllClick} className="btn btn-danger">Delete All</button>
                            <button onClick={this.onCheckAllClick} className="btn btn-outline-danger">Check All</button>
                            <button onClick={this.onUncheckAllClick} className="btn btn-outline-danger">Uncheck All</button>
                        </th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.people.map(p => <tr key={p.id}>
                        <td><input type="checkbox" className='form-check-input' style={{ transform: 'scale(1.5)' }} onChange={() => this.onCheckChanged(p.id)} checked={p.isChecked} /></td>
                        <td>{p.firstName}</td>
                        <td>{p.lastName}</td>
                        <td>{p.age}</td>
                        <td>
                            <button onClick={() => this.onEditClick(p)} className="btn btn-sm btn-warning">Edit</button>
                            <button onClick={() => this.onDeleteClick(p.id)} className="btn btn-sm btn-danger ms-2">Delete</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    }
}

export default PeopleTable;