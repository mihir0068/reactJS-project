import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../Components/header";
import "./userdetails.css";
import { userAction } from "../Store/user-slice";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

const Userdetails = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const [userDetail, setUserDetail] = useState(null);

  const likedUsers = useSelector((state) => state.user.likedUsers);
  const userComments = useSelector((state) =>
    state.user.comment.filter((comment) => comment.userId === +userId)
  );
  console.log(userComments)
  const [comment, setComment] = useState("");

  const likeBtnHandler = (id) => {
    dispatch(userAction.toggleLike(id));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    console.log(comment)
    dispatch(userAction.addCommnet(comment))
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (comment.trim()) {
      dispatch(
        userAction.addCommnet({
          userId: +userId,
          comment: comment,
          id:new Date().toISOString() 
        })
      );
      setComment("");
    }
  };

  const handleDeleteComment = (commentId) => {
    console.log(commentId);
    dispatch(userAction.deleteComment(commentId));
  };

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("user-copy");
    if (storedUserDetails) {
      try {
        const parsedUserDetails = JSON.parse(storedUserDetails);
        setUserDetail(parsedUserDetails);
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!userDetail) {
      const fetchedUserDetails = userData.find((user) => user.id === +userId);
      if (fetchedUserDetails) {
        localStorage.setItem("user-copy", JSON.stringify(fetchedUserDetails));
        setUserDetail(fetchedUserDetails);
      }
    }
  }, [userId, userData, userDetail]);

  if (!userDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header></Header>
      <div className="user-details-container" key={userId}>
        <div className="box1">
          <div className="user-image">
            <img src={userDetail.image} alt="User" className="user-image" />
            <div>
              <p style={{ textAlign: "center" }}> {userDetail.userName}</p>
            </div>
          </div>
          <div className="user-details">
            <h2>
              {userDetail.firstName} {userDetail.maidenName}{" "}
              {userDetail.lastName}{" "}
              <i
                className={`bi bi-heart-fill likebtn ${
                  likedUsers[userDetail.id]
                    ? "bi bi-heart-fill liked bump"
                    : "bi bi-heart"
                }`}
                onClick={() => likeBtnHandler(userDetail.id)}
              ></i>
            </h2>
            <div className="basic-details">
              <h3>Basic Details</h3>
              <p>Email: {userDetail.email}</p>
              <div className="comment-section">
                <form action="">
                  <input
                    type="text"
                    value={comment}
                    onChange={handleCommentChange}
                    id="comment"
                    placeholder="Add a comment..."
                  />
                  <button
                    type="submit"
                    id="addCommentButton"
                    onClick={submitHandler}
                  >
                    Add Comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h3 className="additional-details">
          Additional Details <span></span>
        </h3>
        <div className="box2">
          <div className="subBox">
            <h3>Personal Details</h3>
            <p>
              <b>Gender:</b> {userDetail.gender}
            </p>
            <p>
              <b>Age:</b> {userDetail.age}
            </p>
            <p>
              <b>Phone No:</b> {userDetail.phone}
            </p>
            <p>
              <b>DOB:</b> {userDetail.birthDate}
            </p>
            <p>
              <b>Blood Group:</b> {userDetail.bloodGroup}
            </p>
            <p>
              <b>Weight:</b> {userDetail.weight} Kg
            </p>
            <p>
              <b>Height: </b> {userDetail.height} cm
            </p>
          </div>
          <div className="subBox">
            <h3>Academic Details</h3>
            <p>
              <b>University: </b> {userDetail.university}
            </p>
          </div>
          <div className="subBox">
            <h3>Company Details</h3>
            <p>
              <b>Company Name:</b> {userDetail.company.name}
            </p>
            <p>
              <b>Department:</b> {userDetail.company.department}
            </p>
            <p>
              <b>Designation:</b> {userDetail.company.title}
            </p>
            <p>
              <b>Address:</b> {userDetail.company.address.address},
              {userDetail.company.address.city},
              {userDetail.company.address.state},
              {userDetail.company.address.country}
            </p>
            <div>
              <b>
                <u>Comment :</u>
              </b>
              {userComments.length > 0 ? (
                userComments.map((comment, index) => (
                  <div key={comment.id} className="comment">
                    <div>{comment.comments}</div>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleDeleteComment(comment.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                        value={comment.id}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userdetails;
