import { useState, useEffect } from "react"
import logo from './logo.svg';
import './App.css';
import {TextField} from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Collapse from '@mui/material/Collapse';

const App = () => {

  const [values, setValues] = useState({
    _id: '',
    name: '',
    mobile: '',
    cuisines:[],
    city: '',
    description:'',
    error: '',
  })

  const {_id, name, mobile, cuisines, city, description, error} = values

  const [open, setOpen] = useState(true)
  const [cookData, setCookData] = useState([])
  const [refresh, setRefesh] = useState(false)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:8000/api/get-cook`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(res => {
        setCookData(res.reverse())
      })
    })
  }, [refresh])

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value, error: '' });
  };

  let cityArr = [
    {name: 'Banglore'},
    {name: 'Chennai'},
    {name: 'Delhi'},
    {name: 'Mumbai'},
    {name: 'Kolkata'}
  ]

  let cuisinesArr = [
    {name: 'Bengali'},
    {name: 'Chettinad'},
    {name: 'Continental'},
    {name: 'French'},
    {name: 'Hydrabadi'},
    {name: 'Mexican'}
  ]

  const createCook = (data ={name, mobile, cuisines, city, description}) => {
    if (name ==="" || mobile ==="" || cuisines ==="" || city ==="" || description === "") {
      setValues({...values, error: 'All Fields are requires'})
    } else {
      fetch(`http://localhost:8000/api/create-cook`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        // console.log(response)
        setRefesh(true)
        setOpen(true)
      })
      // console.log(data)
      setRefesh(false)
    }
  }

  const updateCook = (data ={_id, name, mobile, cuisines, city, description}) => {
    if (name ==="" || mobile ==="" || cuisines ==="" || city ==="" || description === "") {
      setValues({...values, error: 'All Fields are requires'})
    } else {
      fetch(`http://localhost:8000/api/update-cook`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        // console.log(response)
        setRefesh(true)
        setOpen(true)
      })
      // console.log(data)
      setRefesh(false)
    }
  }

  const deleteCook = (_id) => {
      fetch(`http://localhost:8000/api/delete-cook/${_id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        // console.log(response)
        setRefesh(true)
        setOpen(true)
      })
      // console.log(data)
      setRefesh(false)
  }

  return (
    <div className="">
      <Collapse in={!open}>
      <form className="mx-auto col-md-6 col-10">
        <div align='center' className="py-md-5 py-3">
          <h2>Create</h2>
        </div>
        {error !== '' ? <div className='text-danger' align='center'>{error}</div> : null}
        <div className="form-group py-2">
            <TextField 
            className="w-100"
                id="standard-basic" 
                type="text"
                label={"Name"} 
                value={name}
                required={true}
                variant="standard" 
                onChange={handleChange('name')}
            />
        </div>
        <div className="form-group py-2">
            <TextField 
            className="w-100"
                id="standard-basic" 
                type="text"
                label={"Mobile"} 
                value={mobile}
                required={true}
                variant="standard" 
                onChange={handleChange('mobile')}
            />
        </div>
        <div className="form-group py-2">
          <FormControl sx={{minWidth: '100%' }} size="small">
              <InputLabel id="demo-select-small">Cuisines</InputLabel>
              <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  multiple={true}
                  value={cuisines}
                  label="Cuisines"
                  onChange={handleChange('cuisines')}
              >
                  {cuisinesArr && cuisinesArr.length !== undefined ? (
                      cuisinesArr && cuisinesArr.map((c, i) => (
                          <MenuItem key={i} value={c.name}>{c.name}</MenuItem>
                      ))
                  ) : null}
              </Select>
          </FormControl>
        </div>
        <div className="form-group py-2">
          <FormControl sx={{minWidth: '100%' }} size="small">
              <InputLabel id="demo-select-small">City</InputLabel>
              <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  multiple={false}
                  value={city}
                  label="city"
                  onChange={handleChange('city')}
              >
                  {cityArr && cityArr.length !== undefined ? (
                      cityArr && cityArr.map((c, i) => (
                          <MenuItem key={i} value={c.name}>{c.name}</MenuItem>
                      ))
                  ) : null}
              </Select>
          </FormControl>
        </div>
        <div className="form-group py-2">
            <TextField 
            className="w-100"
                id="standard-basic" 
                type="text"
                label={"Description"} 
                value={description}
                required={true}
                variant="standard" 
                onChange={handleChange('description')}
            />
        </div>
        <div className="">
          <div className="py-3">
            {!update ?
            <button type="button" onClick={() => createCook({name, mobile, cuisines, city, description})}
             className="btn btn-outline-primary col-12">Create</button> :
            <button type="button" onClick={() => updateCook({_id, name, mobile, cuisines, city, description})}
             className="btn btn-outline-warning col-12">Update</button> }
          </div>
          <div className="py-3">
            <button type="button" onClick={() => setOpen(true)} className="btn btn-outline-success col-12">View Cooks</button>
          </div>
        </div>
      </form>
      </Collapse>
      <Collapse in={open}>
        <div className="py-3 mx-auto col-10">
          <button type="button" onClick={() => setOpen(false)} className="btn btn-outline-success col-12">View Cooks</button>
          <div>
            {cookData && cookData.length !== 0 ? <div>
              <table className="table table-borderless">
                <thead>
                    <tr className="border-bottom border-dark">
                        <th scope="col">Name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Cuisines</th>
                        <th scope="col">City</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                    {cookData.map((c, i) => (
                    <tbody key={i} className="border-bottom border-dark">
                        <tr className='m-3'>
                            <td>{c.name}</td>
                            <td>{c.mobile}</td>
                            <td>
                            {c.cuisines.map((cu, i) => (
                              <li key={i}>
                                {cu}
                              </li>)
                            )}
                            </td>
                            <td>{c.city}</td>
                            <td>{c.description}</td>
                            <td>
                              <button type="button" onClick={() => {setValues({...values, _id: c._id, name:c.name, mobile: c.mobile, description: c.description, cuisines: c.cuisines, city:c.city})
                                setUpdate(true)
                                setOpen(false)}} className="btn btn-sm btn-outline-warning col-12">Update</button>
                            </td>
                            <td>
                              <button type="button" onClick={() => deleteCook(c._id)} className="btn btn-sm btn-outline-danger col-12">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>
            </div> : (<div className="py-4" align="center">No data available</div>)}
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default App;
