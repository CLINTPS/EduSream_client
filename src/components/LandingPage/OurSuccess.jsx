import React from 'react'
import image1 from '../../assets/course/instracture.png'
import image2 from '../../assets/course/student.png'
import image3 from '../../assets/course/classRoom.png'
import image4 from '../../assets/course/teacher.png'

const OurSuccess = () => {
  return (
    <div>
      <h1 className="font-bold text-4xl md:text-5xl text-center pt-16">Our Success</h1>
      <p className="px-4 md:px-20 lg:px-40 text-center text-lg md:text-xl mt-8">
        At EduStream, we measure our success by the achievements of our learners. From enhanced skills and new career opportunities
        to personal growth and academic excellence, our platform is dedicated to empowering individuals to reach their full potential.
        Join the thousands of satisfied students who have transformed their lives with our innovative and effective e-learning solutions.
      </p>

      <h1 className="text-4xl md:text-5xl text-center pt-16">
        <span className="text-blue-800 font-bold">What is </span>
        <span className="text-blue-800">EduStream </span>
        <span className="text-green-500 font-bold">?</span>
      </h1>
      <p className="px-4 md:px-20 lg:px-40 text-center text-lg md:text-xl mt-8">
        EduStream is a platform that allows educators to create online classes whereby they can store the course materials online; 
        manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.
      </p>
        
        <div className='flex flex-col md:flex-row justify-center items-center pt-16'>
        <div className='m-4 md:m-7'>
          <img src={image2} alt="Student 1" className='object-cover rounded-lg shadow-lg md:w-auto md:h-96' />
        </div>
        <div className='m-4 md:m-7'>
          <img src={image1} alt="Instracture 2" className='object-cover rounded-lg shadow-lg md:w-auto md:h-96' />
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-center items-center pt-16'>
        <div className='m-4 md:m-5'>
          <h1 className="text-4xl text-center md:text-left">
            <span className="text-blue-800 font-bold">Everything you can do in a physical <br className="hidden md:block"/> classroom, </span>
            <span className="text-green-400 font-bold">you can do with EduStream</span>
          </h1>
          <p className='text-center md:text-left text-2xl mt-5'>
            EduStream school management software helps traditional and online schools<br className="hidden md:block"/>
            manage scheduling, attendance, payments, and virtual classrooms<br className="hidden md:block"/>
            all in one secure cloud-based system.
          </p>
        </div>
        <div className='m-4 md:m-2 '>
          <img src={image3} alt="Instructor 2" className='object-cover rounded-lg shadow-lg w-full md:w-auto md:h-72' />
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-center sm:flex-col-reverse items-center pt-16'>
        <div className='m-4 md:m-2'>
          <img src={image4} alt="Instructor 2" className='object-cover rounded-lg shadow-lg w-full md:w-auto md:h-96' />
        </div>
        <div className='m-4 md:m-5'>
          <h1 className="text-4xl text-center md:text-left">
            <span className="text-green-400 font-bold">Tools  </span>
            <span className="text-blue-800 font-bold">For Teachers And Learners</span>
          </h1>
          <p className='text-center md:text-left text-2xl mt-5'>
            Class has a dynamic set of teaching tools built to be deployed and used<br className="hidden md:block"/>
            class.Teachers can handout assignments in real-time for students<br className="hidden md:block"/>
            in real-time for students to complete and submit.
          </p>
        </div>
      </div>
    </div>
  )
}

export default OurSuccess
