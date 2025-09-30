import { useContext, useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Inputs from './Inputs';
import Button from './Button';
import AuthContext from '../Context/AuthContext';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';



const PersianLoginForm = () => {

  const authContext = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      identifier: username,
      password: password
    }



    fetch('http://localhost:4000/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(res => {

      console.log(res);
      if (!res.ok) {
        return res.text().then(text => {
          throw new Error(text);
        })
      } else
        return res.json()

    }).then(result => {

      console.log(result)
      authContext.login({}, result.accessToken)
      swal({
        title: "با موفقیت وارد شدید!",
        button: 'بستن',
        icon: "success",
        dangerMode: false,
      }).then(value => {
        navigation('/')
        window.location.reload()
      })



    }).catch((err) => {

      swal({
        title: "کاربری یافت نشد !",
        button: 'تلاش مجدد',
        icon: "warning",
        dangerMode: true,
      })

    })

  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">ورود به حساب کاربری</h1>
          <p className="text-gray-600">لطفا اطلاعات حساب خود را وارد نمایید</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-[1.4rem] font-medium text-gray-700 mb-2 text-right">
                نام کاربری
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-600">
                  <FaUser />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-[1.2rem]"
                  placeholder="نام کاربری خود را وارد کنید"
                  element='input'
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[1.4rem] font-medium text-gray-700 mb-2 text-right">
                رمز عبور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-600">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition text-[1.2rem]"
                  placeholder="رمز عبور خود را وارد کنید"
                  element='input'
                />
                <Button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600 hover:text-green-800"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="mr-2 block text-[1.1rem] text-gray-700">
                  مرا به خاطر بسپار
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500 text-[1.1rem]">
                  رمز عبور را فراموش کرده اید؟
                </a>
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-[1.4rem] font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
              onClick={handleSubmit}
            >
              ورود به حساب
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 text-lg">حساب کاربری ندارید؟</span>
            </div>
          </div>

          <div className="mt-4">
            <Button
              to={'/register'}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-[1.3rem] font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
            >
              ثبت نام
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersianLoginForm