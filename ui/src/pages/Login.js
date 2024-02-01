import { useNavigate } from "react-router-dom";

class Server{
  request(path, fail=false){
    console.log(path);
    return new Promise((res, rej) => {
      setTimeout(() => {
        return fail ? rej("401") : res(200);
      }, 1000)
    });
  }
}
const server = new Server();

export default function Login(){
  const navigate = useNavigate();
  async function onSubmitHandler(evt){
    evt.preventDefault();
    console.log(evt.target);
    const response = await server.request(evt.target.action);
    console.log(response);
    if(response==200){
      console.log("response OK");
      return navigate("/home");
    }
  }
    return (
      <div className="uk-card uk-card-body">
        <form action="/login/password" method="post" onSubmit={onSubmitHandler}>
            <section>
              <div>
                <label>
                  <span>Username</span>
                  <input type="text" className="uk-input"/>
                </label>
              </div>
              <div>
                <label>
                  <span>password</span>
                  <input type="password"  className="uk-input"/>
                </label>                
              </div>
            </section>
            <button type="submit" className="uk-button uk-button-primary">Login</button>
        </form>
      </div>
    )
}