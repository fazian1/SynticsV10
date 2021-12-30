import React, { useState, useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Formik, FormikConsumer, useFormik } from 'formik'
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useRouteMatch, useHistory, useLocation,  useParams } from "react-router-dom";
import { createAnswers, createAssignmentAnswers } from '../../../../Apis/apiForAnswers';
import { getRegisterationStudentsById } from '../../../../Apis/apiForRegistrations';

function FillInTheBlanksForStudent() {
  let {id} = useParams()
  const location = useLocation();
  const editorRef = useRef(null);
  const history = useHistory()
  const [studentDataValues, setStudentDataValues] = useState([])

    useEffect(() => {
      
        const fetchStudentData = async function() {
          const studentData = await getRegisterationStudentsById(id)
          console.log(studentData)
          setStudentDataValues(studentData)
        }
        fetchStudentData() 
        
    }, [])
           /*const { register, handleSubmit } = useForm({
    defaultValues: { text: todo ? todo.text : "" },
  });*/

  /*const submitHandler = handleSubmit((data) => {
    onSubmit(data)
  });*/
    const log = (data) => {
        if (editorRef.current) {
          data.answerContent = editorRef.current.getContent({ format: "text" });
          console.log(data)
          //createAnswers(data)
          //history.push("/answer-list")
        }
    };
  
    /*useEffect(() => {
      const fetchTodo = async () => {
        const blogstitle = await getPlacementTestblogstitle(`${props.match.params._id}`)
        setblogstitle(blogstitle)
      }
      fetchTodo()
    }, []);
    */
    const onSubmit = async (data) => {
        data.optionsQuestionFillInTheBlank = location.state.optionsQuestionFillInTheBlank
        data.studentId = data.studentId.id
        data.teacherId = location.state.teacherId
        data.coursetype = location.state.coursetype
        data.name = studentDataValues.name
        data.email = studentDataValues.email
        data.currentDate = new Date()
        
        if((location.state.startDate != null) && (location.state.endDate != null)){
          console.log(data)
          createAssignmentAnswers(data)
          history.push(`/student/list-of-subjects-for-assignments/${id}`)
        }
        else{
          console.log(data)
          createAnswers(data)
          history.push(`/student/list-of-subjects/${id}`)
        }
    }
  
      //1 Start of by making initial values 
      const formik = useFormik({
          initialValues: {
             name:'',
             email:'',
             grade: location.state.grade,
             answertype: location.state.answertype,
             questionContent: location.state.questioncontent,
             questionTitle: location.state.questiontitle,
             totalMarks: location.state.totalmarks,
             optionsQuestionFillInTheBlank: location.state.optionsQuestionFillInTheBlank,
             answerContent:'',
             marksObtained: '',
             teacherRemarks: '',
             teacherId: '',
             studentId: {id},
             questionId: location.state._id,
             currentDate: '',
          },
  
          //4 Make onSubmit propert to handle what happens to data on form submisison
  
          onSubmit: values => {
  
            
            //createTodo(formik.values)
            //redirecting 
            //history.push("/")
  
            onSubmit(formik.values)
  
          },
  
          //5 Make validation property
          
          validate: values => {
              
              let errors = {}
  
              const letters = /^[A-Za-z ]+$/;
  
              const cnic = /^[0-9--]+$/;
  
              const phone = /^[0-9]+$/;
  
              const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
              
              return errors
  
  
          }
  
  
      })
  
      console.log("Form errors", formik.errors)
      return (

<div>
<div className = "mt-5 pt-4">
{/* Content Wrapper */}
<div id="content-wrapper" className="d-flex flex-column">
{/* Main Content */}
<div id="content">
  {/* Begin Page Content */}
  <div className="containerBlackDashboard-fluid">
    {/* Page Heading */}
    <h1 className='text-center display-2 my-3' style={{ color:'#33334d', fontWeight:'900' }}>Course Content</h1>
    {/* DataTales Example */}
    <div className="card shadow mb-4">
      <div className="card-header py-3" style = {{color : "white", backgroundColor : "#306EFF"}}>
        <h6 className="m-0 font-weight-bold text-white">{location.state.questiontitle}</h6>
      </div>
      <div className="card-body">
      {location.state.questioncontent}
      <hr />
      < br/>
      Options:
      <ul  className = "text-left p-3">
        <li>{location.state.optionsQuestionFillInTheBlank[0].options}</li>
        <li>{location.state.optionsQuestionFillInTheBlank[1].options}</li>
        <li>{location.state.optionsQuestionFillInTheBlank[2].options}</li>
        <li>{location.state.optionsQuestionFillInTheBlank[3].options}</li>
      </ul>
      </div>
    </div>
    <div className="card shadow mb-4">
      <div className="card-header py-3" style = {{color : "white", backgroundColor : "#306EFF"}}>
        <h6 className="m-0 font-weight-bold text-white">Answer</h6>
      </div>
      <div className="card-body">
      <form onSubmit={formik.handleSubmit}>
                  <div className = "mt-4"> 
                      <div class="p-3 mb-2" style = {{color : "white", backgroundColor : "#306EFF"}}>
                          <label><h6 className = "text-white">Type your Answer to above Question below </h6></label>
                      </div>
                      <hr />
                  </div>
                  <div className = "mt-4"> 
                      <div class="p-3 mb-2 bg-light text-dark">
          
                          <input type="text" name="answerContent" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.answerContent} className="form-control"  />
                      </div>
                      <hr />
                  </div>
                      <div className="containerSass mt-3 mb-2">
                        <button type="submit" className="btn btn-outline-primary">
                        Submit Answer
                        </button>
                    </div>
                  </form>
      </div>
    </div>
  </div>
  {/* /.containerBlackDashboard-fluid */}
</div>
{/* End of Main Content */}
{/* Footer */}
<footer className="sticky-footer bg-white">
  <div className="containerBlackDashboard my-auto">
    <div className="copyright text-center my-auto">
      <span></span>
    </div>
  </div>
</footer>
{/* End of Footer */}
</div>
{/* End of Content Wrapper */}
{/* End of Page Wrapper */}
      </div>
      </div>
      )
}

export default FillInTheBlanksForStudent
