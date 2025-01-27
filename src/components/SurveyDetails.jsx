import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SurveyDetails() {
    const { id } = useParams();
    const [survey, setSurvey] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const storedSurveys = localStorage.getItem('surveys');
        if (storedSurveys) {
            const surveys = JSON.parse(storedSurveys);
            const foundSurvey = surveys.find((survey) => survey.id === id);
            setSurvey(foundSurvey);
        }
    }, [id]);

    const handleAnswerChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const handleSubmit = () => {
        console.log('Answers:', answers);
        alert('Your answers have been submitted!');
    };

    if (!survey) {
        return <div>Survey not found.</div>;
    }

    return (
        <div className="survey-details">
            <h2>{survey.title}</h2>
            <form onSubmit={handleSubmit}>
                {survey.questions.map((question) => (
                    <div key={question.id} className="form-group">
                        <label>{question.text}</label>
                        {question.type === 'text' && (
                            <input
                                type="text"
                                value={answers[question.id] || ''}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            />
                        )}
                        {question.type === 'textarea' && (
                            <textarea
                                value={answers[question.id] || ''}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            />
                        )}
                        {question.type === 'select' && (
                            <select
                                value={answers[question.id] || ''}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                            >
                                <option value="">Select an option</option>
                                {question.options.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SurveyDetails;
