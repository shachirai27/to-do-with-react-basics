import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);

    const [feedback, setFeedback] = useState([]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    });

    useEffect(() => {
        fetchFeedback();
    }, []);

    //fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch("/feedback?_sort=id&_order=desc");
        const data = await response.json();
        setFeedback(data);
        setIsLoading(false);
    }

    const deleteFeedback = async (id) => {
        await fetch(`/feedback/${id}`, {
            method: 'DELETE',
        });
        if (window.confirm('Are You Sure You want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    }

    const addFeedback = async (newFeedBack) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(newFeedBack),
        });

        const data = await response.json();

        setFeedback([data, ...feedback]);
    }

    const updateFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        });
    }

    const postUpdatedFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updItem),
        })
        const data = await response.json();
        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data } : item));
    }

    return <FeedbackContext.Provider value={{
        feedback,
        isLoading,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        updateFeedback,
        postUpdatedFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;