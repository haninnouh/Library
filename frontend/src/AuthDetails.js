import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import jwt_decode from "jwt-decode";

function AuthDetails() {
  const { id } = useParams();
  const [author, setAuthor] = useState();
  const [enableEdit, setEnableEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [name, setAuthName] = useState("");
  const [nationality, setNationality] = useState("");
  const [authorImage, setAuthImage] = useState("");

  let decodedData ;
  const storedToken = localStorage.getItem("token");
  if (storedToken){
    decodedData = jwt_decode(storedToken, { payload: true });
     console.log(decodedData);
     let expirationDate = decodedData.exp;
      var current_time = Date.now() / 1000;
      if(expirationDate < current_time)
      {
          localStorage.removeItem("token");
      }
   }

  useEffect(() => {
    axios.get(`/Authors/${id}`).then((res) => { 
      setAuthor(res.data);
      setLoading(false);
    });
  }, []);

  function addBook(e) {
    e.preventDefault();
    let title = e.target.form[0].value;
    let pages = e.target.form[1].value;
    let bookImg = e.target.form[2].value;
    axios
      .post(`/book/${id}`, { title: title, pages: pages, bookImg: bookImg })
      .then((res) => {
        console.log(res);
        setAuthor(res.data);
      });
  }

  function deleteBook(e, bookId) {
    e.preventDefault();
    axios.delete(`/book/${id}/${bookId}`).then((res) => {
      setAuthor(res.data);
    });
  }

  function editInfo(e){
    e.preventDefault();
    setEnableEdit(true)
    setAuthName(author.name)
    setAuthImage(author.authorImage)
    setNationality(author.nationality)

  }

  function editSave(e){
    e.preventDefault();
    axios.patch(`/authors/${id}`,{ name,password,nationality,authorImage }).then((res)=>{
      console.log(res)
      setAuthor(res.data);
    })
    setEnableEdit(false)
  }

  if (loading) {
    return (
     <div> 
     <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={5000} //3 secs
      />
      <p>loading...</p>
      </div>
    );
  }
  return (
    <>
      <Container>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={author.authorImage} />
          <Card.Body>
            <Card.Title>{author.name}</Card.Title>{" "}
            {author.age ? <Card.Title>age: {author.age}</Card.Title> : <></>}
          </Card.Body>
        </Card>

        {(function() {
          if(decodedData!=undefined){
            console.log("decodedData is not undefined")
            if(decodedData.id==id){
              return(
                <>
                <button className="btn btn-primary" onClick={(e)=>{editInfo(e)}}> Edit information </button>
                
            {enableEdit?<form>
              <input value={name} placeholder="name" onChange={(e) => setAuthName(e.target.value)}></input>
              <input value={authorImage} placeholder="image" onChange={(e) => setAuthImage(e.target.value)}></input>
              <input value={nationality} placeholder="nationality" onChange={(e) => setNationality(e.target.value)}></input>
              <input placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
              <button
                onClick={(e) => {
                  editSave(e);
                }}
              >
                Save
              </button>
              
            </form>: <></>}
            <form>
              <input placeholder="book title"></input>
              <input placeholder="book pages"></input>
              <input placeholder="book image"></input>
              <button
                onClick={(e) => {
                  addBook(e);
                }}
              >
                Add book
              </button>
              
            </form>
            </>
              )
            }


            // {decodedData.id==id?
            // <><button className="btn btn-primary" onClick={(e)=>{editInfo(e)}}> Edit information </button>
            // {enableEdit?<form>
            //   <input value={name} placeholder="name" onChange={(e) => setAuthName(e.target.value)}></input>
            //   <input value={authorImage} placeholder="image" onChange={(e) => setAuthImage(e.target.value)}></input>
            //   <input value={nationality} placeholder="nationality" onChange={(e) => setNationality(e.target.value)}></input>
            //   <input placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
            //   <button
            //     onClick={(e) => {
            //       editSave(e);
            //     }}
            //   >
            //     Save
            //   </button>
              
            // </form>: <></>}
            // <form>
            //   <input placeholder="book title"></input>
            //   <input placeholder="book pages"></input>
            //   <input placeholder="book image"></input>
            //   <button
            //     onClick={(e) => {
            //       addBook(e);
            //     }}
            //   >
            //     Add book
            //   </button>
              
            // </form>
            // </>
            // :<></>} 
          }
          else{
            console.log("no sign")
          }
        })()}



        
        <br />
        <br />
        <Row xs={1} md={4} className="g-4">
          {author.books.map((book) => {
            return (
              <div>
                <Card style={{ width: "18rem" }}>
                  <Card.Title>{book.title}</Card.Title>{" "}
                  <Card.Img variant="top" src={book.bookImage} />
                  {decodedData?decodedData.id==id? <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      deleteBook(e, book._id);
                    }}
                  >
                    Delete
                  </button>:<></>: <></>}
                 
                </Card>
              </div>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
export default AuthDetails;
