import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addFeedback } from '../../actions/feedbackActions';
import { clearErrors } from '../../actions/errorActions';

const Feedback = ({ addFeedback, error, props }) => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [msg, setMsg] = useState(null);

    const handleChangeSubject = (e) => setSubject(e.target.value);
    const handleChangeDescription = (e) => setDescription(e.target.value);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        e.target.reset();

        const feedback = {
            subject,
            description
        };

        addFeedback(feedback);

    };

    useEffect(() => {
        // Check for register error
        if (error.id === 'REGISTER_FAIL') {
            setMsg(error.msg.msg);
        } else {
            setMsg(null);
        }

    }, [error]);

    // if (isAuthenticated === true) {
 
        return (
    
            <div className="su-bg">
                <div className=" su-container cu-container"><h2>Feedback</h2>
                    {msg ? <span style={{ color: "red" }}>{msg}</span> : null}
                    <form onSubmit={handleOnSubmit}>
                        <div className="singleItem">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" name="subject" className="name" placeholder="Subject" onChange={handleChangeSubject}
                            />
                        </div>

                        <div className="textArea singleItem">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="" cols="30" rows="5" placeholder="Type your message here .." onChange={handleChangeDescription}
                            ></textarea>
                        </div>

                        <div>
                            <button className="btn btn-success btn-block" type="submit" >Submit</button>
                        </div>
                    </form>
                </div>
            
            </div>
        );
    }
// }

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, {addFeedback, clearErrors })(Feedback);