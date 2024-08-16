import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../Store/user-slice";
import Header from "./header";
import "./users.css";
import { Link } from "react-router-dom";
// import Likebutton from "../UI/LikeButton";
import "bootstrap-icons/font/bootstrap-icons.css";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.userData);
  const likedUsers = useSelector((state) => state.user.likedUsers);
  const likeBtnHandler = (id) => {
    dispatch(userAction.toggleLike(id));
    console.log(id + "liked");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      dispatch(userAction.setUsers(data.users));
    };
    fetchData();
  }, [dispatch]);

  const handleUserClick = (user) => {
    localStorage.setItem("user-copy", JSON.stringify(user));
  };

  const userComments = useSelector((state) => state.user.comment);
  console.log(userComments);
  return (
    <>
      <Header> </Header>

      {users.map((user, index) => {
        const userCommentsForUser = userComments.filter(
          (comment) => comment.userId === user.id
        );

        return (
          <div className="card" key={index}>
            <Link
              className="link"
              to={`/Users/${user.id}`}
              onClick={() => handleUserClick(user)}
            >
              <div className="card-left">
                <div className="card-img">
                  <img src={user.image} alt="not found" />
                </div>
                <div className="card-names">
                  <p>
                    {user.firstName} <br />
                    <sub>Age : {user.age}</sub>
                    <br />
                    <sub>Comments : {userCommentsForUser.length}</sub>
                  </p>
                </div>
              </div>
            </Link>

            <div className="card-right">
              <div className="card-btn">
                <i
                  className={`bi bi-heart-fill likebtn ${
                    likedUsers[user.id]
                      ? "bi bi-heart-fill liked bump"
                      : "bi bi-heart"
                  }`}
                  onClick={() => likeBtnHandler(user.id)}
                ></i>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Users;
