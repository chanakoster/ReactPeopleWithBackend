export default function AddPersonForm({ id, firstName, lastName, age, onTextChange, onAddClick, onUpdateClick, isEditing }) {
    return (
        <div className="row p-5 rounded-3 border border-2 border-primary">
            <div className="col-md-3">
                <input value={firstName} onChange={onTextChange} name="firstName" type="text" className="form-control" placeholder="First Name" />
            </div>
            <div className="col-md-3">
                <input value={lastName} onChange={onTextChange} name="lastName" type="text" className="form-control" placeholder="Last Name" />
            </div>
            <div className="col-md-3">
                <input value={age} onChange={onTextChange} name="age" type="text" className="form-control" placeholder="Age" />
            </div>
            <div className="col-md-3">
                {isEditing ? <button onClick={onUpdateClick} value={id} className="btn btn-primary w-100">Update</button> :
                    <button onClick={onAddClick} className="btn btn-primary w-100">Add Person</button>}
            </div>
        </div>
    )
}

