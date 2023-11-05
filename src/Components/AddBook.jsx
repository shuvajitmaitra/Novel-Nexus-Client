import Container from "./Container";

const AddBook = () => {
    return (
        <Container>
           <h1>Add Books Here!</h1>
           <p>description</p>
         <form className="card-body">
{/* ------------------------------------------------ */}
{/* First row*/}
{/* ------------------------------------------------ */}
        <div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        </div>

{/* ------------------------------------------------ */}
{/* Second row*/}
{/* ------------------------------------------------ */}
      <div>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
        </div>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
        </div>
      </div>
{/* ------------------------------------------------ */}
{/* First row*/}
{/* ------------------------------------------------ */}
<div>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
        </div>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
        </div>
      </div>

      {/* ------------------------------------------------ */}
{/* First row*/}
{/* ------------------------------------------------ */}

<div>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
        </div>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
        </div>
      </div>

{/* ------------------------------------------------ */}
{/* First row*/}
{/* ------------------------------------------------ */}















        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
        </Container>
    );
};

export default AddBook;