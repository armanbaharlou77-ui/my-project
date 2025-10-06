import { useState, useContext, use, useEffect } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from './Button';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const PersianSignupForm = () => {
  const [formData, setFormData] = useState({

    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''

  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isAllowedToRegister, setIsAllowedToRegister] = useState(false)
  const navigate = useNavigate()

  const authContext = useContext(AuthContext)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateFullName = (name) => {
    const re = /^[A-Za-z\s]{6,16}$/; // 6 to 12 characters
    return re.test(name);
  };

  const validateUsername = (name) => {
    const re = /^[a-zA-Z0-9_.]{4,12}$/;
    return re.test(name);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(formData);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10,15}$/; // only digits, length between 10–15
    return re.test(phone);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return re.test(password);
  };


  const registerHandler = (event) => {
    event.preventDefault()

    const newUserInfos = {
      name: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      confirmPassword: formData.confirmPassword
    }

    if (agreeTerms
      && validateFullName(formData.fullName)
      && validatePassword(formData.password)
      && validatePhone(formData.phone)
      && validateEmail(formData.email)
      && validateUsername(formData.username)
    ) {

      fetch('http://localhost:4000/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserInfos)
      }).then(res => res.json())
        .then(result => {
          console.log(result);
          authContext.login(result.user, result.accessToken)
          swal({
            title: "با موفقیت ثبت نام شدید!",
            button: 'بستن',
            icon: "success",
            dangerMode: false,
          }).then(() => {
            navigate('/')
          })

        })



    } else {
      alert('fill all the blanks currectly !!')
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">ثبت نام جدید</h1>
          <p className="text-gray-600">لطفا اطلاعات مورد نیاز را وارد نمایید</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-[1.3rem] font-medium text-gray-700 mb-2 text-right">
                نام کامل
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-600">
                  <FaUser />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${validateFullName(formData.fullName) && 'border-green-500 ring-green-500'}  outline-none transition text-[1.3rem]`}
                  placeholder="نام و نام خانوادگی"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2 text-right text-[1.3rem]">
                نام کاربری
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-600">
                  <FaUser />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${validateUsername(formData.username) && 'border-green-500 ring-green-500'} outline-none transition text-[1.3rem]`}
                  placeholder="نام کاربری دلخواه"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-right text-[1.3rem]">
                ایمیل
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-600">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${validateEmail(formData.email) && 'ring-green-500 border-green-500'}  outline-none transition text-[1.3rem]`}
                  placeholder="example@domain.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-[1.3rem] font-medium text-gray-700 mb-2 text-right">
                شماره تلفن
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-600">
                  <FaPhone />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${validatePhone(formData.phone) && 'ring-green-500 border-green-500'} outline-none transition text-[1.3rem]`}
                  placeholder="09xxxxxxxxx"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[1.3rem] font-medium text-gray-700 mb-2 text-right">
                رمز عبور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-600">
                  <FaLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${validatePassword(formData.password) && 'ring-green-500 border-green-500'}  outline-none transition text-[1.3rem]`}
                  placeholder="حداقل 8 کاراکتر"
                  required
                />
                <Button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600 hover:text-green-800 "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-[1.3rem] font-medium text-gray-700 mb-2 text-right ">
                تکرار رمز عبور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-600 ">
                  <FaLock />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${validatePassword(formData.password) && formData.password === formData.confirmPassword && 'ring-green-500 border-green-500'}  outline-none transition text-[1.3rem]`}
                  placeholder="تکرار رمز عبور"
                  required
                  minLength="8"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600 hover:text-green-800"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mr-2 text-[1.2rem]">
                <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                  با <a href="#" className="text-green-600 hover:text-green-500">شرایط و قوانین</a> موافقم
                </label>
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-[1.4rem] font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
              disabled={!agreeTerms}
              onClick={registerHandler}
            >
              ثبت نام
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-[1.2rem]">
              <span className="px-2 bg-white text-gray-500">قبلا ثبت نام کرده اید؟</span>
            </div>
          </div>

          <div className="mt-4">
            <Button
              to={'/login'}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-[1.3rem] font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
            >
              ورود به حساب
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersianSignupForm;