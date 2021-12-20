import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import jwt_decode from "jwt-decode";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const storedToken = localStorage.getItem("token");
  console.log(storedToken);
  if (storedToken){
     let decodedData = jwt_decode(storedToken, { payload: true });
     let expirationDate = decodedData.exp;
      var current_time = Date.now() / 1000;
      if(expirationDate < current_time)
      {
          localStorage.removeItem("token");
      }
   }
  useEffect(() => {
    axios.get("/allAuthors").then((res) => {
      console.log(res);
      setAuthors(res.data);
    });
  }, []);

  function addAuthor(e) {
    e.preventDefault();
    let name = e.target.form[0].value;
    let nationality = e.target.form[1].value;
    let authorImg = e.target.form[2].value;
    let title = e.target.form[3].value;
    let pages = e.target.form[4].value;
    let bookImg = e.target.form[5].value;

    axios
      .post("/authors", {
        name: name,
        nationality: nationality,
        image: authorImg,
        title: title,
        pages: pages,
        bookImg: bookImg,
      })
      .then((res) => {
        console.log(res);
        setAuthors(res.data);
      });
  }

  function LogOut(e){
    e.preventDefault();
    axios.get('/signout')
  }

  return (
    <>
    
    {/* <button onClick={(e)=>LogOut(e)} >Logout</button> */}
      <Container>
        <Row xs={1} md={2} className="g-4">
          {authors.map((author) => {
            return (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={author.authorImage} />
                <Card.Body>
                  <Card.Title>{author.name}</Card.Title>{" "}
                  <Link to={`/AuthDetails/${author._id}`}>
                    <Button variant="primary">More details</Button>
                  </Link>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>

      {/* <form>
        <input placeholder="author name"></input>
        <input placeholder="author nationality"></input>
        <input placeholder="author image"></input>
        <input placeholder="book title"></input>
        <input placeholder="book pages"></input>
        <input placeholder="book image"></input>
        <button
          type="submit"
          onClick={(e) => {
            addAuthor(e);
          }}
        >
          Add author and book
        </button>
      </form> */}
    </>
  );
}

export default Authors;
