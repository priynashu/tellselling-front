import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import {
  SignInPage,
  SignUpPage,
  ForgotPassword,
  ResetPassword,
  HomePage,
  SalesRoom,
  SelectRoomType,
  CreateRoom1,
  CreateRoom2,
  CreateRoom3,
  ResourceCenter,
  LandingPages,
  Insights,
  Account,
  Users,
  CommissionRules,
  Billing,
  Forms,
  Form,
  
} from './pages'; 
import { AllRoutes } from './utils/AllRoutes';
import 'react-toastify/dist/ReactToastify.min.css';
import SalesRooms from './pages/SalesRooms';
import { getLocalUser } from './utils/GetLocalUser';
import SalesroomsLiveStream from './pages/SalesroomsLiveStream';
import SalesroomPreview from './pages/SalesRoom/CreateRoom2/salesroom-preview'
const App = () => {
  const localUser = getLocalUser();
  console.log("local user is",localUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AllRoutes.signinRoute} element={<SignInPage />} />
        <Route path={AllRoutes.signupRoute} element={<SignUpPage />} />
        <Route path={AllRoutes.forgotPassword} element={<ForgotPassword />} />
        <Route path={AllRoutes.resetPassword} element={<ResetPassword />} />
        <Route path={AllRoutes.homeRoute} element={localUser?<Layout children={<HomePage />} />:<SignInPage/>} />
        <Route path={AllRoutes.salesRoom} element={localUser?<Layout children={<SalesRoom />} />:<SignInPage/>} />
        <Route path={AllRoutes.selectRoomType} element={localUser?<Layout children={<SelectRoomType />} />:<SignInPage/>} />
        <Route path={AllRoutes.createRoom1} element={localUser?<Layout children={<CreateRoom1 />} />:<SignInPage/>} />
        <Route path={AllRoutes.createRoom2} element={localUser?<Layout children={<CreateRoom2 />} />:<SignInPage/>} />
        <Route path={AllRoutes.createRoom3} element={localUser?<Layout children={<CreateRoom3 />} />:<SignInPage/>} />
        <Route path={AllRoutes.resourceCenter} element={localUser?<Layout children={<ResourceCenter />} />:<SignInPage/>} />
        <Route path={AllRoutes.landingPages} element={localUser?<Layout children={<LandingPages />} />:<SignInPage/>} />
        <Route path={AllRoutes.insights} element={localUser?<Layout children={<Insights />} />:<SignInPage/>} />
        <Route path={AllRoutes.account} element={localUser?<Layout children={<Account />} />:<SignInPage/>} />
        <Route path={AllRoutes.users} element={localUser?<Layout children={<Users />} />:<SignInPage/>} />
        <Route path={AllRoutes.commissionRules} element={localUser?<Layout children={<CommissionRules />} />:<SignInPage/>}/>
        <Route path={AllRoutes.billing} element={localUser?<Layout children={<Billing />} />:<SignInPage/>} />
        <Route path={AllRoutes.forms} element={localUser?<Layout children={<Forms/>} />:<SignInPage/>} />
        <Route path={AllRoutes.form} element={localUser?<Layout children={<Form/>} />:<SignInPage/>} />
        <Route path={AllRoutes.salesRooms} element={<SalesRooms/>} />
        <Route path={AllRoutes.salesRoomsLiveStream} element={<SalesroomsLiveStream/>} />
        <Route path="/salesroom-preview" element={<SalesroomPreview/>} />

      </Routes>
    </BrowserRouter>
  );
};

export { App };
