import React from 'react'

const courses = [
  {
    id: 1,
    image: "/src/assets/demoCard/Demo2.png",
    title: "Noteworthy technology acquisitions 2021",
    description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    id: 2,
    image: "/src/assets/demoCard/Demo2.png",
    title: "Noteworthy technology acquisitions 2021",
    description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    id: 3,
    image: "/src/assets/demoCard/Demo2.png",
    title: "Noteworthy technology acquisitions 2021",
    description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  }
];

const instructors = [
  {
    id: 1,
    image: "/src/assets/demoCard/DemoINS.jpg",
    title: "Noteworthy technology acquisitions 2021",
    description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    id: 2,
    image: "/src/assets/demoCard/DemoINS.jpg",
    title: "Noteworthy technology acquisitions 2021",
    description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    id: 3,
    image: "/src/assets/demoCard/DemoINS.jpg",
    title: "Noteworthy technology acquisitions 2021",
    description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  }
];

const Card = ({ image, title, description, onClick }) => (
  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <img className="rounded-t-lg" src={image} alt="" />
    <div className="p-5">
      <p onClick={onClick} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer">
        {title}
      </p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
      <p
        onClick={onClick}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </p>
    </div>
  </div>
);

const UserHomeCourses = () => {
  const handleClick = (id) => {
    console.log(`Clicked item with id: ${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center font-bold text-2xl mb-6">Course Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-14">
        {courses.map((course) => (
          <Card
            key={course.id}
            image={course.image}
            title={course.title}
            description={course.description}
            onClick={() => handleClick(course.id)}
          />
        ))}
      </div>

      <h2 className="text-center font-bold text-2xl mt-12 mb-6">Instructor Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-14">
        {instructors.map((instructor) => (
          <Card
            key={instructor.id}
            image={instructor.image}
            title={instructor.title}
            description={instructor.description}
            onClick={() => handleClick(instructor.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserHomeCourses;
