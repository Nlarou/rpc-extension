import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function RcpNode() {
  let history = useNavigate();
  const [formData, setFormData] = React.useState({
    rcpNodeUrl: "https://rpc-backend.vercel.app/api/",
    text: "",
    selected: "user",
  });
  const [result, setResult] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    //axios post to rcpNodeUrl
    if (formData.selected === "user") {
      axios
        .post(formData.rcpNodeUrl, {
          jsonrpc: "2.0",
          id: 1,
          method: "getUser",
          params: { username: formData.text },
        })
        .then((response) => {
          setResult(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (formData.selected === "project") {
      axios
        .post(formData.rcpNodeUrl, {
          jsonrpc: "2.0",
          id: 1,
          method: "getProject",
          params: { name: formData.text },
        })
        .then((response) => {
          setResult(response.data.result);
        })
        .catch((error) => {
          setResult(error);
        });
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <div className="btn-group absolute top-5 left-5">
        <div
          className="btn btn-large"
          onClick={() => {
            history(-1);
          }}
        >
          Back
        </div>
      </div>
      <div className="container mx-auto h-screen">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-group my-10">
            <h1 className="text-3xl font-bold">
              Welcome to the
              <span className="text-blue-500"> RPC Node Server</span>
            </h1>
            <p className="text-xl text-center">
              Enter a <span className="text-blue-500">User</span> or
              <span className="text-blue-500">Project</span> to see its details.
            </p>
            <p className="text-center">
              Example: <span className="text-blue-500">admin</span> or
              <span className="text-blue-500">projet1</span>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <div className="flex justify-start space-x-2 mb-2">
                <div>User / Project:</div>
                <input
                  type="radio"
                  name="radio-1"
                  class="radio"
                  id="selected"
                  value="user"
                  onChange={handleChange}
                  checked={formData.selected === "user"}
                />
                <input
                  type="radio"
                  name="radio-1"
                  class="radio"
                  id="selected"
                  value="project"
                  onChange={handleChange}
                  checked={formData.selected === "project"}
                />
              </div>
              <div className="relative">
                <input
                  className="w-full pr-40 bg-gray-200 input input-lg text-black"
                  type="text"
                  name="text"
                  id="text"
                  placeholder="Search"
                  value={formData.text}
                  onChange={handleChange}
                />
                <button
                  className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                  type="submit"
                >
                  Go
                </button>
              </div>
            </div>
          </form>
          <div className="my-5 w-3/4 overflow-x-hidden bg-[#f7f6f3]">
            {result &&
              result.map((item) => {
                return (
                  <p className="mx-auto  p-2" key={item[0]}>
                    <pre>{JSON.stringify(item, null, 2)}</pre>
                  </p>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RcpNode;
