import React, { Component } from 'react'
import { searchStudent } from '../actions'
import { connect } from 'react-redux'

class ListStudents extends Component {

    componentDidMount () {
        //need postman ops--for now trying with searchStudents
        const req = {
            "status": "ACTIVE",
            "groups": ["STUDENT"]
        }
        console.log('req', req)
        this.props.dispatch(searchStudent(req))

    }

    render () {
        const {students} = this.props.studentReducer
        return (

            <div className="container-fullwidth">
                <div className="py-5 text-center">
                    <img
                        className="d-block mx-auto mb-4"
                        src="http://www.resetyourbody.com/wp-content/uploads/COMPANY_LOGO/logo-default.png"
                        alt=""
                        width="72"
                        height="72"
                    />
                    <h2>List of students.</h2>
                    <p className="lead">
                        Type the keyword to search for specific student below.
                    </p>
                </div>
                <div className="row" style={{ margin: '0% 0% 0% 25%' }}>
                    <div className="col-md-6">
                        <div className="panel panel-primary">
                            <div className="panel-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="dev-table-filter"
                                    data-action="filter"
                                    data-filters="#dev-table"
                                    placeholder="Search Meeting"
                                />
                            </div>
                            <br/> <br/>
                            <div className="row">
                                <div className="col-md-2 order-md-1 mb-2"></div>
                                <div className="col-md-12 order-md-2">
                                    <h4 className="mb-3">Students' List</h4>
                                </div>
                            </div>
                            <table className="table table-hover" id="dev-table">
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>username</th>
                                    <th>fullname</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    students.map((student) => {
                                        console.log('log stu info', student)
                                        return (
                                            <tr>
                                                <td>1</td>
                                                <td>{student.username}</td>
                                                <td>{student.fullName}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    studentReducer: state.studentReducer
}))(ListStudents)
