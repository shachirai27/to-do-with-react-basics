import { createContext, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {

    const [feedback, setFeedback] = useState([
        {
            id: 1,
            rating: 10,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
        },
        {
            id: 2,
            rating: 9,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
        },
        {
            id: 3,
            rating: 8,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
        },
    ]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    });

    const deleteFeedback = (id) => {
        if (window.confirm('Are You Sure You want to delete?')) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    }

    const addFeedback = (newFeedBack) => {
        setFeedback([newFeedBack, ...feedback]);
    }

    const updateFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        });
    }

    const postUpdatedFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updItem } : item));
    }

    return <FeedbackContext.Provider value={{
        feedback,
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