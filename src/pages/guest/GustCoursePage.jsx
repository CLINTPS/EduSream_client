import React from 'react'
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import IndexNav from '../../components/IndexNav';


const GustCoursePage = () => {
  const { course, loading, error } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div>
        <IndexNav />
        <LoadingData />
        <Footer/>
      </div>
    );
  }

  return (
    <div>
        <IndexNav />
        <h1>CHECKING GUST USER COURSE LIST</h1>
        <Footer/>
    </div>
  )
}

export default GustCoursePage
