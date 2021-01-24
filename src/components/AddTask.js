import React from 'react'

const AddTask = ({ onAdd }) => {
    const [text, setText] = React.useState("")
    const [day, setDay] = React.useState("")
    const [reminder, setRemider] = React.useState(false)

    const onSubmit = (e) => {
        e.preventDefault();

        if(!text) {
            alert('Please enter some text!')
            return;
        }

        onAdd({text, day, reminder})

        setText('')
        setDay('')
        setRemider(false)
    }

    return (
        <form className="add-form" onSubmit={onSubmit}> 
            <div className="form-control">
                <label>Task</label>
                <input type="text" value={text}
                 onChange={e => setText(e.target.value)}
                 placeholder="Add Tasks here" /> 
            </div>
            <div className="form-control">
                <label>Day & time</label>
                <input type="text" value={day}
                 onChange={e => setDay(e.target.value)}
                 placeholder="Add day and time here" /> 
            </div>
            <div className="form-control form-control-check">
                <label>Set reminder</label>
                <input type="checkbox" value={reminder}
                 checked={reminder}
                 onChange={e => setRemider(e.currentTarget.checked)} /> 
            </div>

            <input className="btn btn-block" type="submit" value="Save Task" />
        </form>
    )
}

export default AddTask
