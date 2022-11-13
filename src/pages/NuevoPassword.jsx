import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alerta } from '../components/Alerta';
import clienteAxios from '../config/axios';

export const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const { token } = useParams();
  useEffect(() => {

    comprobarToken();
  }, [])

  const comprobarToken = async () => {
    try {
      await clienteAxios(`/veterinarios/olvide-password/${token}`);
      setAlerta({
        msg: 'Ingresa tu Nuevo Password',
        error: false
      })
      setTokenValido(true);
    } catch (error) {
      setAlerta({
        msg: 'Hubo un error con el enlace',
        error: true
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msg: 'El password debe ser minimo de 6 caracteres',
        error: true
      })
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const res = await clienteAxios.post(url, { password });

      setAlerta({
        msg: res.data.msg,
        error: false
      })
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;
  return (
    <>
      <div className="my-5">
        <h1 className="text-indigo-600 text-center font-black text-5xl mt-12">
          Restablece tu password y no Pierdas Acceso a  {""} <br /> <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white  ">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido &&

          <>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="uppercase text-gray-600 block text-xl font-bold mt-12">Nuevo password</label>
                <input type="password"
                  placeholder='Tu Nuevo Password'
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <input type="submit"
                value="Guardar Nuevo Password"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            </form>
            {passwordModificado && <Link
              className="block text-center my-5 text-gray-500"
              to="/">Iniciar Sesión</Link>}
          </>
        }
      </div>
    </>
  )
}
