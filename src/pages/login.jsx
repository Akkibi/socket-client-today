import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Login = () => {
  const [error, setError] = useState("");
  const inputRef = useRef();
  const { push } = useRouter();

  const onKeyDown = (e) => {
    // detect when user press enter
    if (e.keyCode === 13) {
      localStorage.setItem("username", inputRef.current.value);
      inputRef.current.value = "";

      push("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("error") == 200) {
      console.log("error is present");

      setError("Server is down atm");
    }
  }, []);

  return (
    <div
      className="h-full w-full p-5 bg-red-300"
      style={{
        backgroundImage: "url(/login.svg)",
        backgroundSize: "cover",
      }}
    >
      <div className="flex gap-10 p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute rounded-lg bg-[#313338] text-white">
        <div className="">
          <h1 className="font-bold text-2xl text-center">Ha, te revoilà!</h1>
          <p className="opacity-50 text-center mb-4">
            Nous sommes si heureux de te revoir
          </p>
          <p className="text-sm opacity-75">
            NOM D'UTILISATEUR <span className="text-red-500">*</span>
          </p>
          <input
            className="px-4 py-2 my-2 bg-[#1e1f22] min-w-[40vh] rounded-sm w-full"
            ref={inputRef}
            type="text"
            placeholder="Akkibi"
            onKeyDown={onKeyDown}
          />

          {error !== "" ? <p className="text-blue-500 text-sm">{error}</p> : ""}
          <button className="bg-blue-500 px-4 py-2 rounded-sm mt-10 mb-2 w-full">
            Connexion
          </button>
          <p className="text-sm">
            <span className="opacity-50">besoin d'un compte?</span>{" "}
            <span className="text-blue-500">S'inscrire</span>
          </p>
        </div>
        <div className="max-w-[25vh]">
          <img
            className="w-[20vh] m-auto aspect-square"
            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Sample_EPC_QR_code.png"
            alt="login"
          />
          <p className=" text-2xl font-bold text-center	">
            Se connecter avec un QR code
          </p>
          <p className="opacity-50 text-center mt-2">
            Scane le avec l'aplication mobile Discord pour te connecter
            instantanément
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
