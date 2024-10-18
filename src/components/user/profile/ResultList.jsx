import React, { useEffect, useState } from "react";
import EmtyData from "../../empty/EmtyData";
import LodingData from "../../lodingData/LodingData";
import { useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../../../common/api";
import { config } from "../../../common/configurations";
import { jsPDF } from 'jspdf'

const ResultList = () => {
  const { user } = useSelector((state) => state.user);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${URL}/course/exam-results?userId=${user._id}`,
          config
        );
        console.log("Response of exam result,,,,", response);
        setResults(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching results:", error);
        setLoading(false);
      }
    };
    if (user && user._id) {
      fetchResults();
    }
  }, [user]);

  const handleDownloadCertificate = (result) => {
    const doc = new jsPDF();
  
    doc.setLineWidth(.5);
    doc.rect(10, 10, 190, 277, 'S');
  
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("Certificate of Achievement", 105, 50, null, null, "center");
  
    doc.setFontSize(16);
    doc.setFont("helvetica", "italic");
    doc.text("This certifies that", 105, 70, null, null, "center");
  
    doc.setFontSize(24);
    doc.setFont("times", "bold");
    doc.text(`${user.firstName} ${user.lastName}`, 105, 90, null, null, "center");
  
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("has successfully completed the exam", 105, 110, null, null, "center");
  
    doc.setFontSize(18);
    doc.setFont("times", "bold");
    doc.text(`${result.examId.title}`, 105, 130, null, null, "center");
  
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text(`Course: ${result.courseId.title}`, 105, 150, null, null, "center");
  
    doc.setFontSize(16);
    doc.setFont("times", "bold");
    doc.text(`Score: ${result.score} / ${result.examId.totalScore}`, 105, 170, null, null, "center");
  
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Issued on: ${new Date().toLocaleDateString()}`, 105, 190, null, null, "center");
  
    doc.setLineWidth(0.5);
    doc.line(60, 240, 140, 240);
    doc.setFontSize(12);
    doc.text("Instructor Signature", 105, 250, null, null, "center");
  
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("This certificate is digitally generated and valid.", 105, 270, null, null, "center");
  
    doc.save(`${user.firstName}_${user.lastName}_certificate.pdf`);
  };
  

  if (loading) {
    return (
      <>
        <LodingData />
      </>
    );
  }

  if (!results.length) {
    return (
      <div>
        <EmtyData message="No results and certificate" />
      </div>
    );
  }  

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your Exam Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <div
            key={result._id}
            className={`shadow-md rounded-lg p-4 border-2 ${
              result.resultStatus === "Passed"
                ? "bg-green-100 border-green-500"
                : "bg-red-100 border-red-500"
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">
              Course Name : {result.courseId.title}
            </h3>
            <p className="mb-1">
              <span className="font-semibold">Exam Name : </span>
              {result.examId.title}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Total Questions : </span>
              {result.totalQuestions}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Aswerd Questions : </span>
              {result.correctAnswers}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Total Your Score: </span>
              {result.score}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Single Question Score: </span>
              {result.examId.questionScore}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Passing Score: </span>
              {result.examId.passingScore}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Total Exam Score: </span>
              {result.score}/{result.examId.totalScore}
            </p>
            {result.resultStatus === "Passed" ? (
              <p className="mb-1 text-green-600 font-bold">
                <span className="font-semibold text-black">Result : </span>
                {result.resultStatus}
              </p>
            ) : (
              <p className="mb-1 text-red-600 font-bold">
                <span className="font-semibold text-black">Result : </span>
                {result.resultStatus}
              </p>
            )}
            <div>
              {result.resultStatus === "Passed" ? (
                <button className="bg-blue-500 mt-2 text-white px-4 py-2 rounded"
                onClick={()=>handleDownloadCertificate(result)}
                >
                  Download Certificate
                </button>
              ) : (
                <p className="text-gray-500">Certificate not provided</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultList;
